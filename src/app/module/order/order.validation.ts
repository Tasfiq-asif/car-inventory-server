import { z } from 'zod'
import mongoose from 'mongoose'

// Define the Zod schema for Order validation
export const orderSchema = z.object({
  email: z
    .string()
    .email('Please use a valid email address') // Validate email format
    .min(1, 'Email is required')
    .trim(),
  carId: z
    .string()
    .min(1, 'Car ID is required') // Validate as string first
    .transform((id) => new mongoose.Types.ObjectId(id)), // Transform to ObjectId
  quantity: z
    .number()
    .int('Quantity must be an integer') // Ensures quantity is an integer
    .min(1, 'Quantity must be at least 1'),
  totalprice: z.number().min(0, 'Total price must be a positive number'),
  paymentStatus: z.string().optional(),
  paymentMethod: z.string().optional(),
  paymentId: z.string().optional(),
  sessionId: z.string().optional(),
  notes: z.string().optional(),
})
