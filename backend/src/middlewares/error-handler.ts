import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error & {statusCode?: number},
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
};

export default errorHandler;
