import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminUserZodSchema),
  AdminController.updateAdmin,
);

router.get('/', AdminController.getAllAdmin);

export const AdminRoutes = router;
