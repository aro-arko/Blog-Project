import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

// Middleware to validate incoming requests using Zod schema
const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Parse using the provided Zod schema
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    // If validation passes, move to the next middleware or route handler
    next();
  });
};

export default validateRequest;
