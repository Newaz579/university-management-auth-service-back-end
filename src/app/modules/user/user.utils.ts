import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null,
): Promise<string> => {
  const currentStudentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let incrementedStudentId = (parseInt(currentStudentId) + 1)
    .toString()
    .padStart(5, '0');
  incrementedStudentId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedStudentId}`;

  return incrementedStudentId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentFacultyId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedFacultyId = (parseInt(currentFacultyId) + 1)
    .toString()
    .padStart(5, '0');
  incrementedFacultyId = `F-${incrementedFacultyId}`;
  return incrementedFacultyId;
};
