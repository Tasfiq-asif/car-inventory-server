import { Request, Response } from 'express'
import { orderService } from './order.service'
import { orderSchema } from './order.validation'

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderSchema.parse(req.body)
    const result = await orderService.OrderCar(order)
    res.json({
      status: true,
      message: 'Order added successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      message: ' something went wrong, Order is not Added',
      status: false,
      error: error,
    })
  }
}

const totalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.GetTotalRevenue()
    res.json({
      status: true,
      message: 'Revenue retrieved successfully',
      data: totalRevenue,
    })
  } catch (error) {
    res.json({
      message: ' something went wrong, Order is not Added',
      status: false,
      error: error,
    })
  }
}

export const orderController = {
  createOrder,
  totalRevenue,
}
