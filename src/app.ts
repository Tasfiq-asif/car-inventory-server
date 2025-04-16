import express from 'express'
import carRouter from './app/module/car/car.router'
import authRoute from './app/module/auth/auth.route'
import cors from 'cors'
import userRouter from './app/module/user/user.router'
import errorHandler from './middlewares/errorHandler'
import orderRouter from './app/module/order/order.router'

const app = express()

// Apply CORS configuration once with all allowed origins
app.use(
  cors({
    origin: ['https://car-shop-five-henna.vercel.app', 'http://localhost:5173'],
    credentials: true,
  })
)

app.use(express.json())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1', carRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/user', userRouter)

// Error handler - must be after all routes
app.use(errorHandler)

export default app
