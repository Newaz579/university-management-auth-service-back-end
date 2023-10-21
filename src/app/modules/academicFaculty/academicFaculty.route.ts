import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty,
);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateAcademicFaculty,
);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.get('/', AcademicFacultyController.getAllFaculties);
router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty);

export const AcademicFacultyRoutes = router;
