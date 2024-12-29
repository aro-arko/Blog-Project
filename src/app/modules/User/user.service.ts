import User from './user.model';

const getAllUserFromDB = async () => {
  const result = User.find();
  return result;
};

export const UserServices = {
  getAllUserFromDB,
};
