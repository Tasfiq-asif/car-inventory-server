import express from 'express'
import { orderController } from './order.controller'

const router = express.Router()

router.post('/', orderController.createOrder)
router.get('/revenue', orderController.totalRevenue)
router.get('/user/:email', orderController.getOrdersByEmail)

export const OrderRoutes = router
