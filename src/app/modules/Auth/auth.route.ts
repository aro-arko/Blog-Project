import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../User/user.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidations.userValidationSchema),
  AuthControllers.createUser,
);

export const AuthRoutes = router;
