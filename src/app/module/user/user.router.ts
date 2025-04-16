import { Router } from 'express'

import { USER_ROLE } from './user.constants'
import { UserValidation } from './user.validation'
import { UserController } from './user.controller'
import validateRequest from '../../../middlewares/validateRequest'
import auth from '../../../middlewares/auth'

const userRouter = Router()

userRouter.post(
  '/create-admin',
  validateRequest(UserValidation.userValidationSchema),
  UserController.createUser
)
userRouter.get('/:id', auth(USER_ROLE.admin), UserController.getSingleUser)
userRouter.put('/:id', auth(USER_ROLE.admin), UserController.updateUser)
userRouter.delete('/:id', auth(USER_ROLE.admin), UserController.deleteUser)
userRouter.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getUser
)

// Add routes for password change and profile update
userRouter.patch(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.passwordChangeValidationSchema),
  UserController.changePassword
)

userRouter.patch(
  '/update-profile',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.updateProfileValidationSchema),
  UserController.updateProfile
)

export default userRouter
