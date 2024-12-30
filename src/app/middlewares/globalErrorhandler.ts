/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import AppError from '../errors/AppErrror';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import handleDuplicateError from '../errors/handleDuplicateError';

// Global error handler middleware
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  // Handle validation errors (e.g., mongoose validation)
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
  }
  // Handle duplicate key errors (e.g., MongoDB unique constraints)
  else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
  }
  // Handle custom AppError (your own error class)
  else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error.message;
  }
  // Handle general JavaScript errors
  else if (error instanceof Error) {
    message = error.message;
  }

  // Send error response to client
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
