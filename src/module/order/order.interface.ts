import { ObjectId } from 'mongoose'

export interface Order {
  email: string
  car: ObjectId
  quantity: number
  totalprice: number
}
