import { Request, Response, NextFunction } from 'express';
import { Result } from '../types/result';

// Add default formatted JSON to Express response
const customResponse = (req: Request, res: Response, next: NextFunction): void => {
  function result(message: string, statusCode?: number): void;
  function result(resultBody: Result, message?: string, statusCode?: number): void;

  function result(resultBody: Result | string, message?: string | number, statusCode: number = 200): void {
    if (statusCode === undefined) {
      statusCode = 200;
    }
    if (typeof resultBody === 'string') {
      let result: Result = {
        success: 1,
      };
      result.message = resultBody;
      if (typeof message === 'number') {
        statusCode = message;
      }
      if (statusCode >= 400) {
        result.success = 0;
      }
      resultBody = result;
    } else {
      let success = 1;
      if (typeof message === 'number') {
        message = message.toString();
      }
      if (message) {
        resultBody.message = message;
      }
      if (statusCode >= 400) {
        success = 0;
      }
      resultBody.success = success;
    }
    res.status(statusCode).json(resultBody);
  }

  res.result = result;
  next();
};

export { customResponse };
