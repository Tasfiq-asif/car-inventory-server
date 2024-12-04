import mongoose from 'mongoose'

export interface IOrder {
  email: string
  carId: mongoose.Types.ObjectId
  quantity: number
  totalprice: number
}
