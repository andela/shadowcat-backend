import express from 'express';
import authRouter from './auth';
import profileRoute from './profile';
import tripRouter from './trips.route';
import passwordRouter from './passwordResetRoute';


const usersRouter = express.Router();


usersRouter.use('/v1/auth', authRouter);

usersRouter.use('/v1/users', passwordRouter);
usersRouter.use('/v1/trips', tripRouter);

usersRouter.get('/', (req, res) => res.status(200).send('Welcome to Shadowcat API'));

usersRouter.use('/v1/users/profile', profileRoute);


usersRouter.get('/', (req, res) => res.status(200).send('Welcome to  Shadowcat API'));

usersRouter.use('/v1/users', passwordRouter);
//usersRouter.use('/v1/trips', returntrip);

usersRouter.use((req, res) => {
  res.status(404).json({
    message: 'Not Found'
  });
});


export default usersRouter;


