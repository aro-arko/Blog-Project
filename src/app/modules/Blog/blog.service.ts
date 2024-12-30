import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppErrror';
import User from '../User/user.model';
import { TBlog } from './blog.interface';
import Blog from './blog.model';
import httpStatus from 'http-status';

const createBlogIntoDB = async (author: JwtPayload, payLoad: TBlog) => {
  const user = await User.findOne({ email: author?.userEmail });

  if (user) {
    payLoad.author = user._id;
  } else {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found for the provided email',
    );
  }

  const result = await (await Blog.create(payLoad)).populate('author');

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
};
