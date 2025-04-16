import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import { UserService } from './user.service'
import { StatusCodes } from 'http-status-codes'

const createUser = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await UserService.createUser(payload)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  })
})

const getUser = catchAsync(async (req, res) => {
  const result = await UserService.getUser()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User fetched successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const result = await UserService.getSingleUser(req.params.id)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User fetched successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.id
  const body = req.body
  const result = await UserService.updateUser(userId, body)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User updated successfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.id
  const result = await UserService.deleteUser(userId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User deleted successfully',
    data: result,
  })
})

const changePassword = catchAsync(async (req, res) => {
  const userId = req.user.id
  const { currentPassword, newPassword } = req.body

  const result = await UserService.changePassword(userId, {
    currentPassword,
    newPassword,
  })

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Password updated successfully',
    data: result,
  })
})

const updateProfile = catchAsync(async (req, res) => {
  const userId = req.user.id
  const updateData = req.body

  const result = await UserService.updateProfile(userId, updateData)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Profile updated successfully',
    data: result,
  })
})

export const UserController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  changePassword,
  updateProfile,
}
