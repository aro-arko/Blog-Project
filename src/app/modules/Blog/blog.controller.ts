import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import httpStatus from 'http-status';

const createBlog = catchAsync(async (req, res) => {
  const userData = req.user;
  const result = await BlogServices.createBlogIntoDB(userData, req.body);

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

export const BlogController = {
  createBlog,
};
