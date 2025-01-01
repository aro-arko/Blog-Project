import config from '../../config';
import AppError from '../../errors/AppErrror';
import { TUser, TUserRole } from '../User/user.interface';
import User from '../User/user.model';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';

const createUserIntoDB = async (password: string, payload: TUser) => {
  // checking is user exists
  const isUserExists = await User.findOne({ email: payload.email });
  if (isUserExists) {
    throw new Error('User with this email already exists');
  }

  // Create a user object and set the password
  const userData: Partial<TUser> = {
    ...payload,
    // Use default password if not provided
    password: password || config.default_password,
  };

  // Save the user to the database
  const result = await User.create(userData);
  return result;
};

const loginUser = async (payload: Partial<TUser>) => {
  // Ensure email and password are provided
  if (!payload?.email || !payload?.password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Email and password are required',
    );
  }

  // Find user by email and include the password
  const user = await User.findOne({ email: payload.email }).select('+password');

  // If user doesn't exist
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // Compare the provided password with the stored hashed password
  const isPasswordSame = await bcrypt.compare(payload.password, user.password);

  // If passwords don't match
  if (!isPasswordSame) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // Check if the user is blocked
  if (user.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // Payload for JWT token
  const jwtPayload: {
    userEmail: string;
    userRole: TUserRole;
  } = {
    userEmail: user.email,
    userRole: user.role,
  };

  // Create access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
