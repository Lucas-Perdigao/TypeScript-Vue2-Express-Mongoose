import {Request, Response, NextFunction } from 'express'
import { ErrorMessages } from '../utils/errorHandler/errorMessages'
import { StatusCode } from '../utils/statusCodes/StatusCode'
import jwt from 'jsonwebtoken'

export class AuthMiddleware {
  static async handler(req: Request, res: Response, next: NextFunction){
    const { headers } =  req

    if(!headers.authorization){
      return res.status(StatusCode.UNAUTHORIZED).json(ErrorMessages.UNAUTHORIZED())
    }

    const [, token] = headers.authorization.split(" ")

    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    } catch (error: any) {
      return res.status(StatusCode.UNAUTHORIZED).json(ErrorMessages.UNAUTHORIZED())
    }

    next()
  }
}