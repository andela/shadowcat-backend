import express from 'express';
import authRouter from './auth';
import profileRoute from './profile';
import passwordRouter from './passwordResetRoute';

const usersRouter = express.Router();

usersRouter.use('/v1/auth', authRouter);
usersRouter.use('/', profileRoute);
usersRouter.use('/v1/users', passwordRouter);

usersRouter.get('/', (req, res) => res.status(200).send('Welcome to  Shadowcat API'));


usersRouter.use((req, res) => {
  res.status(404).json({
    message: 'not found'
  });
});

export default usersRouter;
