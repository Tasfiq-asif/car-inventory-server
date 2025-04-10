import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import { AuthService } from './auth.service'

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body)

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  })
})

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body)

  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    status: true,
    message: 'User logged in successfully',
    token: result?.token,
    data: result?.user,
  })
})

const logout = catchAsync(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Invalid authorization header')
  }

  // Extract the token (remove 'Bearer ' from the start)
  const token = authHeader.split(' ')[1]

  const result = await AuthService.logout(token)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'Logged out successfully',
    data: result,
  })
})

export const AuthControllers = {
  register,
  login,
  logout,
}
