import { Request, Response } from 'express';
import { UsersService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await UsersService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Created created Successfully!',
    data: result,
  });
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...facultyData } = req.body;
  const result = await UsersService.createFaculty(faculty, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Created Successfully',
    data: result,
  });
});

export const UsersController = {
  createStudent,
  createFaculty,
};
