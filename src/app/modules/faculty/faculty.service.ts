/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { facultySearchableFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';
import ApiError from '../../../Error/ApiError';
import httpStatus from 'http-status';

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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

  const result = await Faculty.find(whereConditions)
    .populate([
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
  const total = await Faculty.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id }).populate([
    {
      path: 'academicDepartment',
    },
    {
      path: 'academicFaculty',
    },
  ]);
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>,
): Promise<IFaculty | null> => {
  const isExist = await Faculty.find({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty not Found');
  }
  const { name, ...facultyData } = payload;
  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  });
  return result;
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
};
