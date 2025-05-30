import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import catchAsync from '../utils/catchAsync'
import User from '../app/module/user/user.model'
import { TUserRole } from '../app/module/user/user.interface'
import config from '../app/config'

// Simple interface that extends Request with user property
interface AuthRequest extends Request {
  user: JwtPayload & { id: string }
}

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    // checking if the token is missing or not in Bearer format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('You are not authorized!')
    }

    // Extract the token
    const token = authHeader.split(' ')[1]

    // checking if the given token is valid
    const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload

    // Extract user info from token
    const { role, email } = decoded

    // checking if the user exists
    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('This user is not found!')
    }

    // checking if the user is inactive
    const userStatus = user?.userStatus

    if (userStatus === 'inactive') {
      throw new Error('This user is blocked!')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized')
    }

    // Set custom user object with ID from database
    ;(req as AuthRequest).user = {
      ...decoded,
      id: user._id.toString(), // Use the actual user ID from database
    }

    next()
  })
}

export default auth
