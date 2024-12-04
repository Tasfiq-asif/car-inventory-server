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

export const orderService = {
  OrderCar,
}
