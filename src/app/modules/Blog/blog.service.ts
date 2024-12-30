import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppErrror';
import User from '../User/user.model';
import { TBlog } from './blog.interface';
import Blog from './blog.model';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { blogSearchAbleFields } from './blog.constant';

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

const deleteBlogFromDB = async (accessUserData: JwtPayload, id: string) => {
  // finding the blog using it's _id
  const blogDetails = await Blog.findById(id);

  // blog author details
  const blogDetailsUserId = blogDetails?.author;
  const blogDetailsUserDetails = await User.findById(blogDetailsUserId);
  const blogDetailsUserEmail = blogDetailsUserDetails?.email;

  // current user
  const accessingUserEmail = accessUserData?.userEmail;

  if (blogDetailsUserEmail !== accessingUserEmail) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Sorry! You are not allowed to delete this blog',
    );
  }

  const deletedBlog = await Blog.findByIdAndDelete(id);
  return deletedBlog;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(blogSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await blogsQuery.modelQuery;
  return result;
};

export default getAllBlogsFromDB;

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
