import { model, Schema } from 'mongoose'
import { ICarInput } from './car.interface'

const carSchema = new Schema<ICarInput>(
  {
    brand: {
      type: String,
      required: true, // Brand is mandatory
      trim: true, // Removes leading and trailing spaces
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1886, // The year the first car was made
      max: new Date().getFullYear(), // Ensures the year is not in the future
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensures price is non-negative
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        message: 'Please pick a valid categoty',
      }, // Limits category to specific values
    },
    description: {
      type: String,
      trim: true,
      default: 'No description provided', // Default description
    },
    quantity: {
      type: Number,
      required: true,
      min: 0, // Ensures quantity is non-negative
    },
    inStock: {
      type: Boolean,
      required: true,
      default: false, // Defaults to not in stock
    },
  },
  { timestamps: true }
)

const Car = model<ICarInput>('car', carSchema)

export default Car
