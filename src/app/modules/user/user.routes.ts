import express from 'express';
import { UsersController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();
router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UsersController.createUser,
);

export const UsersRoutes = router;
