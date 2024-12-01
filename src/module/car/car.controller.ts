import { Request, Response } from 'express'
import Car from './car.model'

const createCar = async (req: Request, res: Response) => {
  try {
    const payload = req.body

    const result = await Car.create(payload)

    res.json({
      message: ' Car added successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: ' something went wrong',
      error: error,
    })
  }
}

export const carController = {
  createCar,
}
