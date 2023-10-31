import { IUser } from './user.interface';
import { User } from './user.model';
import config from '../../../config';
import ApiError from '../../../Error/ApiError';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  //default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  user.role = 'student';
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  );

  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //generate Student Id
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;
    //array
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }
    //set student _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser,
): Promise<IUser | null> => {
  //Default Password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  user.role = 'faculty';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //generate Faculty ID
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;
    //array
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to Create new Faculty',
      );
    }
    //set Faculty _id into user.faculty
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create New User');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;
};

export const UsersService = {
  createStudent,
  createFaculty,
};
