import config from '../../config'
import { IUser } from './user.interface'
import User from './user.model'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const createUser = async (payload: IUser): Promise<IUser> => {
  payload.role = 'admin'
  const result = await User.create(payload)
  return result
}

const getUser = async () => {
  const result = await User.find()
  return result
}

const getSingleUser = async (id: string) => {
  const result = await User.findById(id)
  return result
}

const updateUser = async (id: string, data: Partial<IUser>) => {
  // Create an updateable object with only the fields we want to allow updating
  const updateData: Partial<IUser> = {}

  // Only copy allowed fields
  if (data.name) updateData.name = data.name
  if (data.role) updateData.role = data.role
  if (data.userStatus) updateData.userStatus = data.userStatus
  if ('photo' in data) updateData.photo = data.photo

  console.log('Updating user with data:', updateData)

  const result = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  })

  if (!result) {
    throw new Error('User not found')
  }

  return result
}

const deleteUser = async (id: string) => {
  // Check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid user ID format')
  }

  try {
    const result = await User.findByIdAndDelete(id)

    if (!result) {
      throw new Error('User not found or already deleted')
    }

    return result
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to delete user')
  }
}

const changePassword = async (
  userId: string,
  {
    currentPassword,
    newPassword,
  }: { currentPassword: string; newPassword: string }
) => {
  // Find user with password
  const user = await User.findById(userId).select('+password')
  if (!user) {
    throw new Error('User not found')
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
  if (!isPasswordValid) {
    throw new Error('Current password is incorrect')
  }

  // Option 1: Update directly to avoid pre-save hook
  await User.updateOne(
    { _id: userId },
    {
      $set: {
        password: await bcrypt.hash(
          newPassword,
          Number(config.bcrypt_salt_rounds)
        ),
      },
    }
  )

  return { success: true }
}

const updateProfile = async (userId: string, data: Partial<IUser>) => {
  // Ensure only allowed fields are updated
  const updateData: Partial<IUser> = {}

  // Only copy allowed fields
  if (data.name) updateData.name = data.name
  if ('photo' in data) updateData.photo = data.photo

  const result = await User.findByIdAndUpdate(userId, updateData, { new: true })
  return result
}

export const UserService = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  changePassword,
  updateProfile,
}
