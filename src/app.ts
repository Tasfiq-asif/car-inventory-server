import express from 'express'
import carRouter from './module/car/car.router'

const app = express()
app.use(express.json())

app.use('/api', carRouter)

export default app
