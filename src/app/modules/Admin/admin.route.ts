import express from 'express';
import auth from '../../middlewares/auth';
import { AdminControllers } from './admin.controller';

const router = express.Router();

// block user
router.patch('/users/:userId/block', auth('admin'), AdminControllers.blockUser);

// delete blog
router.delete('/blogs/:id', auth('admin'), AdminControllers.deleteBlog);

export const AdminRoutes = router;
