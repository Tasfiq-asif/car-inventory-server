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
export const UserValidation = {
  userValidationSchema,
}
