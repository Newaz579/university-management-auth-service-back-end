import { Schema, model } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';
import { academicFacultyTitles } from './academicFaculty.constant';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      enum: academicFacultyTitles,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'Academic Faculty',
  academicFacultySchema,
);
