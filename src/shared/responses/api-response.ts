import { Response } from 'express';

export class ApiResponse {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode = 200,
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data: data ?? {},
    });
  }

  static error(
    res: Response,
    message: string,
    errors: unknown[] = [],
    statusCode = 500,
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}