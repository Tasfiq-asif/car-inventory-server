import { Request, Response } from 'express'
import { orderService } from './order.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await req.body
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

export const orderController = {
  createOrder,
}
