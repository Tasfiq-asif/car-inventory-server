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

const getsingleCar = async (id: string) => {
  const result = await Car.findById(id)
  return result
}

const updateCar = async (id: string, data: ICarInput) => {
  const result = await Car.findByIdAndUpdate({ id, data })
  return result
}
const deleteCar = async (id: string) => {
  const result = await Car.findByIdAndUpdate({ id })
  return result
}

export const carService = {
  createCar,
  getAllCars,
  getsingleCar,
  updateCar,
  deleteCar,
}
