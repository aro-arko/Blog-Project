import User from '../User/user.model';

const blockUserIntoDB = async (id: string) => {
  const result = User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {
      new: true,
      upsert: true,
    },
  );

  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = User.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  blockUserIntoDB,
  deleteBlogFromDB,
};
