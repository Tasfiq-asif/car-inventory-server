import { Request, Response } from 'express'

import { carService } from './car.service'

const createCar = async (req: Request, res: Response) => {
  try {
    const payload = req.body

    const result = await carService.createCar(payload)

    res.json({
      status: true,
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
