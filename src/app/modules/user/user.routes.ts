import express from 'express';
import { UsersController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();
router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentUserZodSchema),
  UsersController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyUserZodSchema),
  UsersController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminUserZodSchema),
  UsersController.createAdmin,
);

export const UsersRoutes = router;
