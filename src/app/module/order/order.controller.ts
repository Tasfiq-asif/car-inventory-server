import { Request, Response } from 'express'
import { orderService } from './order.service'
import { orderSchema } from './order.validation'
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderSchema.parse(req.body)
    const result = await orderService.OrderCar(order)
    res.json({
      status: true,
      message: 'Order added successfully',
      data: result,
    })
  } catch (error: any) {
    res.json({
      message: ' something went wrong, Order is not Added',
      status: false,
      error: error.errors || error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    })
  }
}

const totalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.GetTotalRevenue()
    res.json({
      status: true,
      message: 'Total Revenue retrieved successfully',
      data: totalRevenue,
    })
  } catch (error: any) {
    res.json({
      message: ' something went wrong, Order is not Added',
      status: false,
      error: error.errors || error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    })
  }
}

const getOrdersByEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params
  const orders = await orderService.GetOrdersByEmail(email)

  sendResponse(res, {
    statusCode: 200,
    message: 'Orders retrieved successfully',
    data: orders,
  })
})

export const orderController = {
  createOrder,
  totalRevenue,
  getOrdersByEmail,
}
