import express from 'express';
import authRouter from './auth';
import profileRoute from './profile';
import rolesRouter from './roles.route';
import permissionsRouter from './permissions.route';
import multiCityTripsRouter from './trips.route';
import passwordRouter from './passwordResetRoute';

const usersRouter = express.Router();

usersRouter.use('/v1/auth', authRouter);
usersRouter.use('/v1/users/profile', profileRoute);
usersRouter.use('/v1/users', passwordRouter);
usersRouter.use('/v1/trips', multiCityTripsRouter);
usersRouter.use('/v1/users', rolesRouter);
usersRouter.use('/v1/users', permissionsRouter);

usersRouter.get('/', (req, res) => res.status(200).send('Welcome to Shadowcat API'));

usersRouter.use((req, res) => {
  res.status(404).json({
    message: 'not found'
  });
});

export default usersRouter;
