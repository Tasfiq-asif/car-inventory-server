import Car from '../car/car.model'
import { IOrder } from './order.interface'
import Order from './order.model'

const OrderCar = async (order: IOrder) => {
  const car = await Car.findById(order.carId)
  if (!car) {
    throw new Error('Car not found')
  }

  if (car.quantity < order.quantity) {
    throw new Error('Not enough cars in stock')
  }

  car.quantity -= order.quantity
  car.inStock = car.quantity > 0
  await car.save()

  const result = await Order.create(order)
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

export const orderService = {
  OrderCar,
  GetTotalRevenue,
  GetOrdersByEmail,
}
