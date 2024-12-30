import config from '../../config';
import AppError from '../../errors/AppErrror';
import { TUser, TUserRole } from '../User/user.interface';
import User from '../User/user.model';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';

const createUserIntoDB = async (password: string, payload: TUser) => {
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
  // accessing user from the User model by their email address
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  // checking the password is same or not
  const isPasswordSame = await bcrypt.compare(
    payload?.password as string,
    user?.password as string,
  );

  // checking if the user exists
  if (!user || !isPasswordSame) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // checking if the user is blocked or not
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // the data we are going to pass inside the token
  const jwtPayload: {
    userEmail: string;
    userRole: TUserRole;
  } = {
    userEmail: user?.email,
    userRole: user?.role,
  };

  // access token to identify the user with their role
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
