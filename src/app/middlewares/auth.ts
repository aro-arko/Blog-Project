/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../config';
import AppError from '../errors/AppErrror';
import { TUserRole } from '../modules/User/user.interface';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../modules/User/user.model';

// Authorization middleware to check user roles
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    // Retrieve token from headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Extract the token after 'Bearer '
    const token = authHeader.split(' ')[1];

    try {
      // Verify the token and decode it
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      const { userEmail, userRole } = decoded;

      // Check if user exists
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
      }

      // Check if user is blocked
      if (user.isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
      }

      // Check if the user's role is authorized
      if (requiredRoles.length && !requiredRoles.includes(userRole)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      // Attach user information to the request object
      req.user = decoded;

      next();
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token!');
    }
  });
};

export default auth;
