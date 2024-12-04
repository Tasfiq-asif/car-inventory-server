import { Request, Response } from 'express'

import { carService } from './car.service'
import { carSchema } from './car.validation'

const createCar = async (req: Request, res: Response) => {
  try {
    const payload = carSchema.parse(req.body)

    const result = await carService.createCar(payload)

    res.json({
      message: ' Car added successfully',
      status: true,
      data: result,
    })
  } catch (error) {
    res.json({
      message: ' something went wrong',
      status: false,
      error: error,
    })
  }
}

const getCars = async (req: Request, res: Response) => {
  try {
    const result = await carService.getAllCars()
    res.json({
      message: 'All Car data retrieved successfully',
      status: true,
      data: result,
    })
  } catch (error) {
    res.json({
      message: ' something went wrong',
      status: false,
      error: error,
    })
  }
}

const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params

    const result = await carService.getsingleCar(carId)

    res.json({
      message: 'Car retrieved successfully',
      status: true,
      data: result,
    })
  } catch (error) {
    res.json({
      message: 'Could not find the Car',
      status: false,
      error: error,
    })
  }
}

const updateCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params
    const data = req.body

    const result = await carService.updateCar(carId, data)

    res.json({
      message: 'Car information updated successfully',
      status: true,
      data: result,
    })
  } catch (error) {
    res.json({
      message: 'Could not find the Car',
      status: false,
      error: error,
    })
  }
}

const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params

    const result = await carService.deleteCar(carId)

    res.json({
      status: true,
      message: 'Car deleted successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      message: 'Could not find the Car',
      status: false,
      error: error,
    })
  }
}

export const carController = {
  createCar,
  getCars,
  getSingleCar,
  updateCar,
  deleteCar,
}
