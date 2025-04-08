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
userRouter.get('/:userId', UserController.getSingleUser)
userRouter.put('/:userId', UserController.updateUser)
userRouter.delete('/:userId', UserController.deleteUser)
userRouter.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getUser
)

export default userRouter
