import express from 'express';
import authRouter from './auth';
import passwordRouter from './passwordResetRoute';

import notifyUserRouter from './notifyUserRoute';

const usersRouter = express.Router();

const foo = (io = null) => {
  usersRouter.use('/v1/auth', authRouter);

  usersRouter.use('/v1/users', passwordRouter);

  usersRouter.use('/v1/trips', notifyUserRouter(io));

  usersRouter.get('/', (req, res) => res.status(200).send('Welcome to  Shadowcat API'));

  usersRouter.use('/v1/users', passwordRouter);

  usersRouter.use((req, res) => {
    res.status(404).json({
      message: 'not found'
    });
  });
  return usersRouter;
};

export default foo;
