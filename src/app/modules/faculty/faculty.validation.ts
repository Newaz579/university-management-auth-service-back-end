import { z } from 'zod';
import {
  bloodGroup,
  designation,
  gender,
} from '../users.constant/users.constant';

const updateFacultyUserZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    designation: z.enum([...designation] as [string, ...string[]]).optional(),
    profileImage: z.string().optional(),
  }),
});

export const FacultyValidation = {
  updateFacultyUserZodSchema,
};
