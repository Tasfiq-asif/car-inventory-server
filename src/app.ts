import express from 'express'
import carRouter from './app/module/car/car.router'
import orderRouter from './app/module/order/order.router'
import authRoute from './app/module/auth/auth.route'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.use(
  cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'], // your frontend URL
  })
)

app.use('/api/v1/auth', authRoute)
app.use('/api/v1', carRouter)
app.use('/api/v1', orderRouter)

export default app