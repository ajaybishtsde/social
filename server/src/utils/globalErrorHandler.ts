import { Request, Response } from 'express';
export const globalErrorHandler = (err: any, req: Request, res: Response, next: any) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status === false ? false : 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || 'Internal server error',
    error: err,
  });
};
