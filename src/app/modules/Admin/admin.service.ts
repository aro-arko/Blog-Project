import AppError from '../../errors/AppErrror';
import Blog from '../Blog/blog.model';
import User from '../User/user.model';
import httpStatus from 'http-status';

const blockUserIntoDB = async (id: string) => {
  // Find the user by ID
  const user = await User.findById(id);

  if (!user) {
    // If user does not exist, throw an error
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.isBlocked) {
    // If the user is already blocked, throw an error
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already blocked');
  }

  // Update the user to block them
  const result = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {
      new: true,
    },
  );

  return result;
};

const deleteBlogFromDB = async (id: string) => {
  // Check if the blog exists
  const blog = await Blog.findById(id);

  if (!blog) {
    // If the blog does not exist, throw an error
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');
  }

  // Proceed to delete the blog
  const result = await Blog.findByIdAndDelete(id);

  return result;
};

export const AdminServices = {
  blockUserIntoDB,
  deleteBlogFromDB,
};
