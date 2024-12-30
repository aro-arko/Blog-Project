import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
  // Extract password and user data
  const { password, ...userData } = req.body;
  const result = await AuthServices.createUserIntoDB(password, userData);

  const { _id, name, email } = result;

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: {
      _id,
      name,
      email,
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
};
