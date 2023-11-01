import { z } from 'zod';
import {
  bloodGroup,
  designation,
  gender,
} from '../users.constant/users.constant';

const createStudentUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is Required',
        }),
        middleName: z
          .string({
            required_error: 'Middle Name is Required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last Name is Required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is Required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood Group is Required',
        })
        .optional(),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact Number is Required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact Number is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      presentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father Name is Required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation is Required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact no is required',
        }),
        motherName: z.string({
          required_error: 'Mother Name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother Contact No is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local Guardian name is required',
        }),
        occupation: z.string({
          required_error: 'Local Guardian Occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local Guardian Contact No is required',
        }),
        address: z.string({
          required_error: 'Local Guardian address is required',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

const createFacultyUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is Required',
        }),
        middleName: z
          .string({
            required_error: 'Middle Name is Required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last Name is Required',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is Required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact Number is Required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact Number is required',
      }),
      presentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood Group is Required',
        })
        .optional(),
      designation: z.enum([...designation] as [string, ...string[]], {
        required_error: 'Designation is Required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});
const createAdminUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is Required',
        }),
        middleName: z
          .string({
            required_error: 'Middle Name is Required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last Name is Required',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is Required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact Number is Required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact Number is required',
      }),
      presentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood Group is Required',
        })
        .optional(),
      designation: z.string({
        required_error: 'Designation is Required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createStudentUserZodSchema,
  createFacultyUserZodSchema,
  createAdminUserZodSchema,
};
