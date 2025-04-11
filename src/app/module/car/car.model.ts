import { model, Schema } from 'mongoose'
import { ICarInput } from './car.interface'

const carSchema = new Schema<ICarInput>(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1886,
      max: new Date().getFullYear(),
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    mileage: {
      type: Number,
      required: true,
      min: 0,
    },
    fuelType: {
      type: String,
      required: true,
      enum: {
        values: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
        message: 'Please pick a valid fuel type',
      },
    },
    transmission: {
      type: String,
      required: true,
      enum: {
        values: ['Automatic', 'Manual'],
        message: 'Please pick a valid transmission type',
      },
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        message: 'Please pick a valid category',
      },
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    features: {
      type: [String],
      required: true,
      default: [],
    },
    description: {
      type: String,
      trim: true,
      default: 'No description provided',
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
)

carSchema.pre('save', function (next) {
  this.inStock = this.quantity > 0
  next()
})

const Car = model<ICarInput>('car', carSchema)

export default Car
