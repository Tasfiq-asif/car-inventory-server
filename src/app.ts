import express from 'express'
import carRouter from './module/car/car.router'
import orderRouter from './module/order/order.router'

const app = express()
app.use(express.json())

app.use('/api', carRouter)
app.use('/api', orderRouter)

export default app
