import config from '../../config';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';

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

export const AuthServices = {
  createUserIntoDB,
};
