import express from 'express'
import carRouter from './app/module/car/car.router'
import authRoute from './app/module/auth/auth.route'
import cors from 'cors'
import userRouter from './app/module/user/user.router'
import errorHandler from './middlewares/errorHandler'

const app = express()
app.use(cors())
app.use(express.json())
app.use(cors())

app.use(
  cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'], // your frontend URL
  })
)

app.use('/api/v1/auth', authRoute)
app.use('/api/v1', carRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/user', userRouter)

// Error handler - must be after all routes
app.use(errorHandler)

export default app
