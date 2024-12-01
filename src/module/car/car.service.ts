import { ICarInput } from './car.interface'
import Car from './car.model'

const createCar = async (payload: ICarInput): Promise<ICarInput> => {
  const result = await Car.create(payload)
  return result
}

const getAllCars = async () => {
  const result = await Car.find()
  return result
}

export const carService = {
  createCar,
  getAllCars,
}
