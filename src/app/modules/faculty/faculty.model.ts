import { Schema, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';
import {
  bloodGroup,
  designation,
  gender,
} from '../users.constant/users.constant';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';

export const FacultySchema = new Schema<IFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      required: true,
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    gender: {
      type: String,
      enum: gender,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    designation: {
      type: String,
      enum: designation,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: AcademicDepartment,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: AcademicFaculty,
      required: true,
    },
    profileImage: {
      type: String,
      // required: true
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Faculty = model<IFaculty, FacultyModel>('Faculty', FacultySchema);
