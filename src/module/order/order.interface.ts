import { ObjectId } from 'mongoose'

export interface IOrder {
  email: string
  carId: ObjectId
  quantity: number
  totalprice: number
}
