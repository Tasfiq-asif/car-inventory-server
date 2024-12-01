import { Router } from 'express'
import { carController } from './car.controller'

const carRouter = Router()

carRouter.post('/cars', carController.createCar)
carRouter.get('/cars', carController.getCars)

export default carRouter
