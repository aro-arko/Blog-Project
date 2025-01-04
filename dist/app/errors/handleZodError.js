"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
    };
};
exports.default = handleZodError;
