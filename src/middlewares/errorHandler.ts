import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

// Global error handler
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.error('Error:', err)

  // Set default error response
  const response = {
    success: false,
    message: err.message || 'Something went wrong',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  }

  // Send error response
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
}

export default errorHandler
