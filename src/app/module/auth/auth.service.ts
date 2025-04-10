import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import BlacklistedToken from './token.model'

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
