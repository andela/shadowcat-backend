import express from 'express';
import userRoutes from './users';

const usersRouter = express.Router();
usersRouter.use('/', userRoutes);


export default usersRouter;
