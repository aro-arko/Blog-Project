/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import AppError from '../errors/AppErrror';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import handleDuplicateError from '../errors/handleDuplicateError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  // Handling validation errors
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
  }
  // Handling duplicate key errors
  else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
  }
  // Handling custom AppError
  else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error.message;
  }
  // General error handling for other errors
  else if (error instanceof Error) {
    message = error.message;
  }

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: config.node_env === 'development' ? error?.stack : null,
  });

  return;
};

export default globalErrorHandler;
