import express from 'express';
import authRouter from './auth';
import multiCityTripsRouter from './trips.route';
import passwordRouter from './passwordResetRoute';

const usersRouter = express.Router();

usersRouter.use('/v1/auth', authRouter);
usersRouter.use('/', profileRoute);
usersRouter.use('/v1/users', passwordRouter);

usersRouter.get('/', (req, res) => res.status(200).send('Welcome to  Shadowcat API'));


usersRouter.use('/v1/users', passwordRouter);
usersRouter.use('/v1/trips', multiCityTripsRouter);

usersRouter.get('/', (req, res) => res.status(200).send('Welcome to  Shadowcat API'));

usersRouter.use('/v1/users', passwordRouter);

usersRouter.use((req, res) => {
  res.status(404).json({
    message: 'not found'
  });
});

export default usersRouter;
