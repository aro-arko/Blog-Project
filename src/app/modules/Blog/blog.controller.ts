import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import httpStatus from 'http-status';

const createBlog = catchAsync(async (req, res) => {
  console.log(req.user);
  const result = await BlogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
};
