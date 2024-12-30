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

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      invalid_type_error: 'Email must be string',
    }),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long'),
  }),
});

export const userValidations = {
  userValidationSchema,
  userLoginValidationSchema,
};
