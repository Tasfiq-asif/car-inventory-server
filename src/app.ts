import express from 'express'
import carRouter from './app/module/car/car.router'
import orderRouter from './app/module/order/order.router'
import authRoute from './app/module/auth/auth.route'
import cors from 'cors';

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api', carRouter)
app.use('/api', orderRouter)

export default app
