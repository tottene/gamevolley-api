import 'dotenv-flow/config';
import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';

import 'express-async-errors';
import AppError from './errors/AppError';

import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
