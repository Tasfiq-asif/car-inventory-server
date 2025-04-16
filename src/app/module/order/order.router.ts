import express from 'express'
import { orderController } from './order.controller'

const router = express.Router()

router.post('/', orderController.createOrder)
router.get('/all', orderController.getAllOrders)
router.get('/revenue', orderController.totalRevenue)
router.get('/user/:email', orderController.getOrdersByEmail)
router.post('/create-checkout-session', orderController.createCheckoutSession)
router.get('/verify-payment/:sessionId', orderController.verifyPayment)

export default router
