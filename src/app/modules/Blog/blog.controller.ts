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
  const userData = req.user;
  const { id } = req.params;
  // console.log(userData, req.params);
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

export const BlogController = {
  createBlog,
  updateBlog,
};
