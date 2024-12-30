import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(BlogValidations.blogValidationSchema),
  BlogController.createBlog,
);

export const BlogRoutes = router;
