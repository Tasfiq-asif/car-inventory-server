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
  } catch (error: any) {
    res.json({
      message: ' something went wrong',
      status: false,
      error: error.errors || error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
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
  } catch (error: any) {
    res.json({
      message: ' something went wrong',
      status: false,
      error: error.errors || error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
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
  } catch (error: any) {
    res.json({
      message: 'Could not find the Car',
      status: false,
      error: error.errors || error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    })
  }
}

const updateCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params
    const validatedData = carSchema.parse(req.body)

    const result = await carService.updateCar(carId, validatedData)

    res.json({
      message: 'Car information updated successfully',
      status: true,
      data: result,
    })
  } catch (error: any) {
    res.json({
      message: 'Could not update the Car',
      status: false,
      error: error.errors || error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
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
  } catch (error: any) {
    res.json({
      message: 'Could not find the Car',
      status: false,
      error: error.errors || error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
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
