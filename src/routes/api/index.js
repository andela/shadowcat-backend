import express from 'express';
import authRouter from './auth';
import passwordRouter from './passwordResetRoute';
import returntrip from './returntrip';

const usersRouter = express.Router();

usersRouter.use('/v1/auth', authRouter);

usersRouter.use('/v1/users', passwordRouter);

usersRouter.get('/', (req, res) => res.status(200).send('Welcome to  Shadowcat API'));

usersRouter.use('/v1/users', passwordRouter);
usersRouter.use('/v1/trips', returntrip);

usersRouter.use((req, res) => {
  res.status(404).json({
    message: 'not found'
  });
});

export default usersRouter;


