import { z } from 'zod'

export const carSchema = z.object({
  brand: z
    .string()
    .min(1, 'Brand is required')
    .transform((str) => str.trim()),

  model: z
    .string()
    .min(1, 'Model is required')
    .transform((str) => str.trim()),

  title: z
    .string()
    .min(1, 'Title is required')
    .transform((str) => str.trim()),

  subtitle: z
    .string()
    .min(1, 'Subtitle is required')
    .transform((str) => str.trim()),

  image: z
    .string()
    .url('Image must be a valid URL')
    .min(1, 'Image URL is required'),

  year: z
    .number()
    .int()
    .min(1886, 'Year must be a valid car year')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),

  price: z
    .number()
    .min(0, 'Price must be a positive number'),

  mileage: z
    .number()
    .min(0, 'Mileage must be a non-negative number'),

  fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid'], {
    errorMap: () => ({ message: 'Please pick a valid fuel type' }),
  }),

  transmission: z.enum(['Automatic', 'Manual'], {
    errorMap: () => ({ message: 'Please pick a valid transmission type' }),
  }),

  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: () => ({ message: 'Please pick a valid category' }),
  }),

  location: z
    .string()
    .min(1, 'Location is required')
    .transform((str) => str.trim()),

  color: z
    .string()
    .min(1, 'Color is required')
    .transform((str) => str.trim()),

  features: z
    .array(z.string().min(1, 'Feature must be a non-empty string'))
    .min(1, 'At least one feature is required'),

  description: z
    .string()
    .nullable()
    .transform((str) => str?.trim() || 'No description provided'),

  quantity: z
    .number()
    .int()
    .min(0, 'Quantity must be non-negative'),

  inStock: z.boolean().default(false),
});

export type ICarInput = z.infer<typeof carSchema>
