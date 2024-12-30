/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../config';
import AppError from '../errors/AppErrror';
import { TUserRole } from '../modules/User/user.interface';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../modules/User/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userEmail, userRole, iat } = decoded;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    const isBlocked = user?.isBlocked;
    if (isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
    }

    if (requiredRoles && !requiredRoles.includes(userRole)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
