import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';

const router = express.Router();

// create a blog (only users not admin)
router.post(
  '/',
  auth('user'),
  validateRequest(BlogValidations.blogValidationSchema),
  BlogController.createBlog,
);

// update a blog
router.patch(
  '/:id',
  auth('user'),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogController.updateBlog,
);

export const BlogRoutes = router;
