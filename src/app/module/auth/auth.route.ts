import { Router } from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { UserValidation } from '../user/user.validation'
import { AuthControllers } from './auth.controller'
import { AuthValidation } from './auth.validation'
import auth from '../../../middlewares/auth'

const authRoute = Router()

authRoute.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.register
)

authRoute.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login
)

// Allow any authenticated user to logout
authRoute.post('/logout', auth('user', 'admin'), AuthControllers.logout)

export default authRoute
