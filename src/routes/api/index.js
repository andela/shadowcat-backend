import express from 'express';
import authRouter from './auth';
import profileRoute from './profile';
import tripRouter from './trips.route';
import rolesRouter from './roles.route';
import permissionsRouter from './permissions.route';
import passwordRouter from './passwordResetRoute';
import accommodationRouter from './accommodation.route';
import roomRouter from './room.route';


const usersRouter = express.Router();

usersRouter.use('/v1/auth', authRouter);
usersRouter.use('/v1/users', passwordRouter);
usersRouter.use('/v1/trips', tripRouter);
usersRouter.use('/v1/users', rolesRouter);
usersRouter.use('/v1/users', permissionsRouter);
usersRouter.use('/v1/users', accommodationRouter);
usersRouter.use('/v1/users', roomRouter);
usersRouter.use('/v1/users/profile', profileRoute);


export default usersRouter;
