import { Request, Response } from 'express'
import { orderService } from './order.service'
import { orderSchema } from './order.validation'
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import stripe from '../../config/stripe'
import config from '../../config'

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await orderSchema.parse(req.body)
  const result = await orderService.OrderCar(order)

  sendResponse(res, {
    statusCode: 201,
    message: 'Order added successfully',
    data: result,
  })
})

const totalRevenue = catchAsync(async (req: Request, res: Response) => {
  const totalRevenue = await orderService.GetTotalRevenue()

  sendResponse(res, {
    statusCode: 200,
    message: 'Total Revenue retrieved successfully',
    data: totalRevenue,
  })
})

const getOrdersByEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params
  const orders = await orderService.GetOrdersByEmail(email)

  sendResponse(res, {
    statusCode: 200,
    message: 'Orders retrieved successfully',
    data: orders,
  })
})

const createCheckoutSession = catchAsync(
  async (req: Request, res: Response) => {
    const { items, email } = req.body

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.image],
            metadata: {
              carId: item.carId,
            },
            description: `${item.brand} ${item.model}`,
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
        },
        quantity: item.quantity,
      })),
      customer_email: email,
      success_url: `${config.client_url}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.client_url}/order-failed`,
    })

    sendResponse(res, {
      statusCode: 200,
      message: 'Checkout session created successfully',
      data: { sessionId: session.id },
    })
  }
)

const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const { sessionId } = req.params

  try {
    // Retrieve the session with expanded line items data
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    })

    if (session.payment_status === 'paid') {
      try {
        // Create orders in our database from the successful payment
        const orders = await orderService.CreateOrderFromPayment(session)

        sendResponse(res, {
          statusCode: 200,
          message: 'Payment verified successfully and orders created',
          data: { verified: true, orders },
        })
      } catch (orderError) {
        // Even if there's an error with order creation, consider the payment verified
        sendResponse(res, {
          statusCode: 200,
          message:
            'Payment verified but could not create orders fully. Please contact support.',
          data: {
            verified: true,
            orderError: true,
            errorMessage: (orderError as Error).message,
          },
        })
      }
    } else {
      sendResponse(res, {
        statusCode: 400,
        message: 'Payment not completed',
        data: { verified: false, session },
      })
    }
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      message: 'Error verifying payment',
      data: { error: (error as Error).message },
    })
  }
})

export const orderController = {
  createOrder,
  totalRevenue,
  getOrdersByEmail,
  createCheckoutSession,
  verifyPayment,
}
