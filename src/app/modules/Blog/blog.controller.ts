import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import httpStatus from 'http-status';

const createBlog = catchAsync(async (req, res) => {
  // accessing user data from the token
  const userData = req.user;
  const result = await BlogServices.createBlogIntoDB(userData, req.body);

  // destructuring required contents from result
  const { _id, title, content, author } = result;
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: {
      _id,
      title,
      content,
      author,
    },
  });
});

const updateBlog = catchAsync(async (req, res) => {
  //accessing user from token
  const userData = req.user;
  const { id } = req.params;

  const result = await BlogServices.updateBlogIntoDB(userData, id, req.body);

  // destructuring required objects
  const { _id, title, content, author } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: {
      _id,
      title,
      content,
      author,
    },
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const userData = req.user;
  const { id } = req.params;

  await BlogServices.deleteBlogFromDB(userData, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  const eachResult = result.map((blog) => ({
    _id: blog._id,
    title: blog.title,
    content: blog.content,
    author: blog.author, // Assuming `author` already contains details
  }));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: eachResult,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
