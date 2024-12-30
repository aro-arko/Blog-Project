import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const cleanedUserId = userId.startsWith(':') ? userId.slice(1) : userId;

  await AdminServices.blockUserIntoDB(cleanedUserId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  await AdminServices.deleteBlogFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const AdminControllers = {
  blockUser,
  deleteBlog,
};
