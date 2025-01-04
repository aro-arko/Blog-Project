"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
    };
};
exports.default = handleCastError;
