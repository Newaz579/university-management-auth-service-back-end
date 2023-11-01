import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
// import { UsersRoutes } from './app/modules/user/user.routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
import routes from './app/routes';
import httpStatus from 'http-status';
// import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application

// app.use('/api/v1/users', UsersRoutes);
// app.use('/api/v1/academic-semester', AcademicSemesterRoutes);

app.use('/api/v1/', routes);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   //   Promise.reject(new Error('Unhandled promise rejection'));
// });

//global error handler
app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
