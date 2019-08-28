
import express from 'express';
import passport from 'passport';
import authRouter from './auth';

import { Router } from 'express';
import logoutRoute from './logout.route';

const usersRouter = Router();

usersRouter.use('/', logoutRoute);
usersRouter.get('/', (request, response) => response.status(200).send('Welcome to  Shadowcat API'));

usersRouter.use('/v1/auth', authRouter);

usersRouter.use((req, res) => {
  res.status(404).json({
    message: 'not found'
  });
});

export default usersRouter;
