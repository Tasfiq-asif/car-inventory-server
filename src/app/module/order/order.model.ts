import { model, Schema } from 'mongoose'
import { IOrder } from './order.interface'

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: 'string',
      required: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    carId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'car',
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalprice: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentStatus: {
      type: String,
      required: false,
    },
    paymentMethod: {
      type: String,
      required: false,
    },
    paymentId: {
      type: String,
      required: false,
    },
    sessionId: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

const Order = model<IOrder>('order', orderSchema)

export default Order
