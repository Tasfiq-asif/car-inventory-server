import stripe from '../../config/stripe'
import Car from '../car/car.model'
import { IOrder } from './order.interface'
import Order from './order.model'

const OrderCar = async (order: IOrder) => {
  const car = await Car.findById(order.carId)
  if (!car) {
    throw new Error('Car not found')
  }

  // Check if we have enough cars in stock
  if (car.quantity < order.quantity) {
    // Instead of throwing an error, adjust the order quantity to available stock
    order.quantity = car.quantity

    // If no cars left, create the order without updating inventory
    if (car.quantity === 0) {
      order.notes =
        'Item was out of stock, order created for recording purposes only'
      const result = await Order.create(order)
      return result
    }
  }

  // Update car inventory
  car.quantity -= order.quantity
  car.inStock = car.quantity > 0
  await car.save()

  const result = await Order.create(order)
  return result
}

const getOrders = async () => {
  const result = await Order.find()
  return result
}
const GetTotalRevenue = async () => {
  const revenue = await Order.aggregate([
    {
      $lookup: {
        from: 'cars',
        localField: 'carId',
        foreignField: '_id',
        as: 'carDetails',
      },
    },
    { $unwind: '$carDetails' },
    {
      $group: {
        _id: null, // Grouping all orders together
        totalRevenue: {
          $sum: {
            $multiply: ['$quantity', '$carDetails.price'],
          },
        },
      },
    },
  ])
  return revenue[0]?.totalRevenue || 0
}

const GetOrdersByEmail = async (email: string) => {
  const orders = await Order.find({ email }).populate('carId')
  return orders
}

const CreateOrderFromPayment = async (sessionData: any) => {
  // Extract line items from the expanded session data if available
  const lineItems =
    sessionData.line_items ||
    (await stripe.checkout.sessions.listLineItems(sessionData.id, {
      expand: ['data.price.product'],
    }))

  // For each line item, create an order
  const orders = []

  // This is a temporary solution to match line items with cars
  const allCars = await Car.find({}).lean()

  for (const item of lineItems.data) {
    // Try to find a matching car based on the product name
    const productName = item.description || ''

    // Find a car with a matching title
    let car = allCars.find((c) => c.title === productName)

    if (!car) {
      // If no exact match, try to find a car that contains part of the product name
      car = allCars.find(
        (c) => productName.includes(c.title) || c.title.includes(productName)
      )
    }

    if (!car) {
      // If still no match, use the first car in stock as a fallback
      car = allCars.find((c) => c.inStock)
    }

    if (!car) {
      throw new Error(`No car found for product "${productName}"`)
    }

    // Create order directly with the car ID to avoid validation issues
    const order: IOrder = {
      email: sessionData.customer_details.email,
      carId: car._id,
      quantity: item.quantity || 1,
      totalprice: (item.amount_total || 0) / 100, // Convert from cents to dollars
      paymentStatus: 'completed',
      paymentMethod: 'card',
      paymentId: sessionData.payment_intent,
      sessionId: sessionData.id,
    }

    try {
      // Create the order and update inventory
      const result = await OrderCar(order)
      orders.push(result)
    } catch {
      // If there's an error creating the order, create it without inventory update
      order.notes =
        'Order created without inventory update due to validation issues'

      // Create order directly
      const result = await Order.create(order)
      orders.push(result)
    }
  }

  return orders
}

export const orderService = {
  OrderCar,
  GetTotalRevenue,
  getOrders,
  GetOrdersByEmail,
  CreateOrderFromPayment,
}
