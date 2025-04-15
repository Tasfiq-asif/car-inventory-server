import { z } from 'zod'

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required and must be string',
      })
      .min(3)
      .max(100),
    email: z
      .string({
        required_error: 'Email is required and must be string',
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required and must be string',
      })
      .min(6, { message: 'password must be minimum of 6 characters' })
      .max(100, { message: 'Password can not be more than 20 characters' }),
  }),

  photo: z
    .string({
      required_error: 'Photo must be provided and must be string',
    })
    .optional(),
})
const passwordChangeValidationSchema = z.object({
  body: z.object({
    currentPassword: z
      .string({ required_error: 'Current password is required' })
      .min(6, { message: 'Current password must be at least 6 characters' }),
    newPassword: z
      .string({ required_error: 'New password is required' })
      .min(6, { message: 'New password must be at least 6 characters' })
      .max(100, { message: 'New password cannot be more than 100 characters' }),
  }),
})

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(100).optional(),
    photo: z.string().optional(),
  }),
})

export const UserValidation = {
  userValidationSchema,
  passwordChangeValidationSchema,
  updateProfileValidationSchema,
}
