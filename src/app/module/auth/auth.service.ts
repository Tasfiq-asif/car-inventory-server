import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import BlacklistedToken from './token.model'
import config from '../../config'

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
    id: user._id.toString(),
    email: user?.email,
    role: user?.role,
  }

  const token = jwt.sign(jwtPayload, config.jwt_secret, { expiresIn: '30d' })

  // Return a modified user object with only the fields you want to expose
  const userWithoutPassword = {
    _id: user._id, // Include the _id field
    email: user.email,
    name: user.name,
    role: user.role,
    userStatus: user.userStatus,
    photo: user.photo,
  }

  return { token, user: userWithoutPassword }
}

const logout = async (token: string) => {
  // Get token expiration from JWT
  const decoded = jwt.decode(token) as jwt.JwtPayload
  if (!decoded || !decoded.exp) {
    throw new Error('Invalid token')
  }

  // Add token to blacklist
  await BlacklistedToken.create({
    token,
    expiresAt: new Date(decoded.exp * 1000),
  })

  return { success: true, message: 'Logged out successfully' }
}

export const AuthService = {
  register,
  login,
  logout,
}
