import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../User/user.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

// create an user('user' | 'admin')
router.post(
  '/register',
  validateRequest(userValidations.userValidationSchema),
  AuthControllers.createUser,
);

// log in as user or admin
router.post(
  '/login',
  validateRequest(userValidations.userLoginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
