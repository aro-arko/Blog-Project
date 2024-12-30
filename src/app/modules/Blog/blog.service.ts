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

const updateBlogIntoDB = async (
  author: JwtPayload,
  id: string,
  payLoad: { title: string; content: string },
) => {
  // finding the blog using it's _id
  const blogDetails = await Blog.findById(id);

  // blog author details
  const blogDetailsUserId = blogDetails?.author;
  const blogDetailsUserDetails = await User.findById(blogDetailsUserId);
  const blogDetailsUserEmail = blogDetailsUserDetails?.email;

  // current user
  const accessingUser = author?.userEmail;

  // matching the user is same author or not
  if (blogDetailsUserEmail !== accessingUser) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not allowed to update this blog',
    );
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, payLoad, {
    new: true,
    upsert: true,
  }).populate('author');
  return updatedBlog;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
};
