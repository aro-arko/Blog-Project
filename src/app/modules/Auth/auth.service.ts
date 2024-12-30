import config from '../../config';
import AppError from '../../errors/AppErrror';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';

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

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  return user;
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
