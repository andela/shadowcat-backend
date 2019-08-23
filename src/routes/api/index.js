
import express from 'express';
import passport from 'passport';
import authRouter from './auth';

const usersRouter = express.Router();

usersRouter.get('/', (request, response) => response.status(200).send('Welcome to  Shadowcat API'));

usersRouter.use('/auth', authRouter);

usersRouter.use((req, res) => {
  res.status(404).json({
    message: 'not found'
  });
});

export default usersRouter;
