/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../Error/ApiError';
import httpStatus from 'http-status';
import { studentSearchableFields } from './student.constant';

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Student.find(whereConditions)
    .populate([
      {
        path: 'academicSemester',
      },
      {
        path: 'academicDepartment',
      },
      {
        path: 'academicFaculty',
      },
    ])
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id).populate([
    {
      path: 'academicSemester',
    },
    {
      path: 'academicDepartment',
    },
    {
      path: 'academicFaculty',
    },
  ]);
  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student not Found');
  }
  const { name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = { ...studentData };

  /*
  const name = {
    firstName: 'Newaz',
    middleName: 'Sharif',
    lastName: Sakib
  }
  */

  //dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>; // 'name.firstName', 'name.middleName', 'name.lastName'
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>; // guardian er key gula asbe like as uporer name er gula jevabe asche oivabe
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian]; //updatedStudentData['guardian.motherContactNo'] = guardian[motherContactNo] baki gula o evabe asbe. j key gula guardian er modde ache;
      //updatedStudentData --> object Create --> guardian : {motherContactNo: 018...}
    });
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey =
        `localGuardian.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });

  return result;
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
};
