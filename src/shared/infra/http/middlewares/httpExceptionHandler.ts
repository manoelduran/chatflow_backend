import {AppError} from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

class HttpExceptionHandler {
  public handle(exception: Error, request: Request, response: Response, _: NextFunction): Response {
    if (exception instanceof AppError) {
      return response.status(exception.statusCode).json({
        status: 'error',
        message: exception.message,
      });
    }

    console.error(exception);
console.log('excpetion', exception)
    return response.status(500).json({
      status: 'error',
      message: 'Falha interna no servidor.',
    });
  }
}

export const httpExceptionHandler = new HttpExceptionHandler();
