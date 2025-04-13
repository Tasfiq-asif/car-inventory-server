import { Router } from 'express'
import { orderController } from './order.controller'

const orderRouter = Router()

orderRouter.post('/orders', orderController.createOrder)
orderRouter.get('/orders', orderController.getOrders)
orderRouter.get('/orders/revenue', orderController.totalRevenue)
orderRouter.get('/orders/:email', orderController.getUserOrders)

export default orderRouter 
