import express from 'express';
import authRouter from './auth';
<<<<<<< HEAD
import profileRoute from './profile';

const usersRouter = express.Router();
usersRouter.use('/', socialMediaRoutes);
=======
import passwordRouter from './passwordResetRoute';

const usersRouter = express.Router();

>>>>>>> e49bd74ef2e6ac74fb27f783fb6900cd121652c2
usersRouter.use('/v1/auth', authRouter);
usersRouter.use('/', profileRoute);

usersRouter.use('/v1/users', passwordRouter);

usersRouter.get('/', (req, res) => res.status(200).send('Welcome to  Shadowcat API'));

usersRouter.use('/v1/users', passwordRouter);

usersRouter.use((req, res) => {
  res.status(404).json({
    message: 'not found'
  });
});

export default usersRouter;
