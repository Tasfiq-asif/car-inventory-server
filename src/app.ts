import express from 'express'
import carRouter from './app/module/car/car.router'
import orderRouter from './app/module/order/order.router'

const app = express()
app.use(express.json())

app.use('/api', carRouter)
app.use('/api', orderRouter)

export default app
