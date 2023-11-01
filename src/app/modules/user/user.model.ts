import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { Admin } from '../admin/admin.model';
import { Faculty } from '../faculty/faculty.model';
import { Student } from '../student/student.model';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: Student,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: Faculty,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: Admin,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const User = model<IUser, UserModel>('User', userSchema);
