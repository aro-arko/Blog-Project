"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: 'Name must be a string',
        })
            .min(1, 'Name cannot be empty'),
        email: zod_1.z
            .string({
            invalid_type_error: 'Email must be a string',
        })
            .email('Email must be a valid string'),
        password: zod_1.z
            .string({
            invalid_type_error: 'Password must be a string',
        })
            .min(8, 'Password must be at least 8 characters')
            .max(100, 'Password is too long'),
    }),
});
const userLoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            invalid_type_error: 'Email must be string',
        }),
        password: zod_1.z
            .string({
            invalid_type_error: 'Password must be string',
        })
            .min(8, 'Password must be at least 8 characters')
            .max(100, 'Password is too long'),
    }),
});
exports.userValidations = {
    userValidationSchema,
    userLoginValidationSchema,
};
