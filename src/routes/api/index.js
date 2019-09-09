import express from 'express';
import authRouter from './auth';
import profileRoute from './profile';
import multiCityTripsRouter from './trips.route';
import passwordRouter from './passwordResetRoute';


const usersRouter = express.Router();

const indexRoute = (io = null) => {
  usersRouter.use('/v1/auth', authRouter);

  usersRouter.use('/v1/users', passwordRouter);

  usersRouter.use('/v1/trips', multiCityTripsRouter(io));

  usersRouter.use('/v1/users/profile', profileRoute);


  usersRouter.get('/', (req, res) => res.status(200).send('Welcome to  Shadowcat API'));


  usersRouter.use((req, res) => {
    res.status(404).json({
      message: 'not found'
    });
  });
  return usersRouter;
};

export default indexRoute;
