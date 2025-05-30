import { NextFunction, Request, Response, RequestHandler } from 'express'

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error: Error) => next(error))
  }
}

export default catchAsync
