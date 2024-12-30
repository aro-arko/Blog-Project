import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth('user'), BlogController.createBlog);

export const BlogRoutes = router;
