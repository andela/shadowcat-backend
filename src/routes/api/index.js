
import express from 'express';
import socialMediaRoutes from './socialmedia';
import authRouter from './auth';
import profileRoute from './profile';

const usersRouter = express.Router();
usersRouter.use('/', socialMediaRoutes);
usersRouter.use('/v1/auth', authRouter);
usersRouter.use('/', profileRoute);

usersRouter.use((req, res) => {
  res.status(404).json({
    message: 'not found'
  });
});

export default usersRouter;
