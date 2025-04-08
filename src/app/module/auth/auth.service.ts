import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (payload: IUser) => {
  const result = await User.create(payload)
  return result
}

const login = async (payload: { email: string; password: string }) => {
  //checking if the user exists
  const user = await User.findOne({ email: payload?.email }).select('+password')

  if (!user) {
    throw new Error('User not found')
  }

  const userStatus = user?.userStatus
  if (userStatus === 'inactive') {
    throw new Error('User is not blocked')
  }
  //checking if the password is correct

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  )

  if (!isPasswordMatched) {
    throw new Error('Password is incorrect')
  }

  //create token and sent to client

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }

  const token = jwt.sign(jwtPayload, 'secret', { expiresIn: '30d' })

  return { token, user }
}

export const AuthService = {
  register,
  login,
}
