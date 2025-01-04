"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppErrror_1 = __importDefault(require("../../errors/AppErrror"));
const user_model_1 = __importDefault(require("../User/user.model"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_utils_1 = require("./auth.utils");
const createUserIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking is user exists
    const isUserExists = yield user_model_1.default.findOne({ email: payload.email });
    if (isUserExists) {
        throw new Error('User with this email already exists');
    }
    // Create a user object and set the password
    const userData = Object.assign(Object.assign({}, payload), { 
        // Use default password if not provided
        password: password || config_1.default.default_password });
    // Save the user to the database
    const result = yield user_model_1.default.create(userData);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure email and password are provided
    if (!(payload === null || payload === void 0 ? void 0 : payload.email) || !(payload === null || payload === void 0 ? void 0 : payload.password)) {
        throw new AppErrror_1.default(http_status_1.default.BAD_REQUEST, 'Email and password are required');
    }
    // Find user by email and include the password
    const user = yield user_model_1.default.findOne({ email: payload.email }).select('+password');
    // If user doesn't exist
    if (!user) {
        throw new AppErrror_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
    // Compare the provided password with the stored hashed password
    const isPasswordSame = yield bcrypt_1.default.compare(payload.password, user.password);
    // If passwords don't match
    if (!isPasswordSame) {
        throw new AppErrror_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
    // Check if the user is blocked
    if (user.isBlocked) {
        throw new AppErrror_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked');
    }
    // Payload for JWT token
    const jwtPayload = {
        userEmail: user.email,
        userRole: user.role,
    };
    // Create access token
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
exports.AuthServices = {
    createUserIntoDB,
    loginUser,
};
