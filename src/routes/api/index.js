
import express from 'express';

import socialMediaRoutes from './socialmedia';
import authRouter from './auth';
import passwordRouter from './passwordResetRoute';

const usersRouter = express.Router();
usersRouter.use('/', socialMediaRoutes);

usersRouter.get('/', (request, response) => response.status(200).send('Welcome to  Shadowcat API'));

usersRouter.use('/v1/auth', authRouter);
usersRouter.use('/v1/users', passwordRouter);

usersRouter.use((req, res) => {
  res.status(404).json({
    message: 'not found'
  });
});

export default usersRouter;
