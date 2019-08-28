
import { Router } from 'express';
import logoutRoute from './logout.route';

const usersRouter = Router();

usersRouter.use('/', logoutRoute);


export default usersRouter;
