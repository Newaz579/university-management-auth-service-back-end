import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
  '/create-management-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.createManagementDepartment,
);

router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment,
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.updateManagementDepartment,
);

router.get('/', ManagementDepartmentController.getAllManagementDepartment);

export const ManagementDepartmentRoutes = router;
