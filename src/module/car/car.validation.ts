import { z } from 'zod'

export const carSchema = z.object({
  brand: z
    .string()
    .min(1, 'Brand is required')
    .transform((str) => str.trim()), // Trim leading/trailing spaces
  model: z
    .string()
    .min(1, 'Model is required')
    .transform((str) => str.trim()), // Trim leading/trailing spaces
  year: z
    .number()
    .int()
    .min(1886, 'Year must be a valid car year')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: () => ({ message: 'Please pick a valid category' }),
  }),
  description: z
    .string()
    .optional()
    .transform((str) => str?.trim() || 'No description provided'),
  quantity: z.number().int().min(0, 'Quantity must be non-negative'),
  inStock: z.boolean().default(false),
})

export type ICarInput = z.infer<typeof carSchema>
