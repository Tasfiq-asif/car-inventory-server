import { Request, Response } from 'express'

import { carService } from './car.service'

const createCar = async (req: Request, res: Response) => {
  try {
    const payload = req.body

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

    const result = await carService.updateCar(carId)

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

const deleteCarCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await carService.deleteCar(id)

    res.json({
      status: true,
      message: 'Car retrieved successfully',
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
}
