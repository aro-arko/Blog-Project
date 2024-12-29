import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Passowrd must be string',
    })
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
    .optional(),
});

export const userValidations = {
  userValidationSchema,
};
