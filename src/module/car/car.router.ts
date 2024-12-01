import { Router } from 'express'
import { carController } from './car.controller'

const carRouter = Router()

carRouter.post('/create-car', carController.createCar)

export default carRouter
