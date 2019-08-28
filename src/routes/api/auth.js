import express from 'express';
import { signupController, signupVerifyController } from '../../controllers';
import signupValidator from '../../validation/signup';
import signupVerifyMiddleware from '../../middlewares';
import loginValidation from '../../validation/userValidation';
import UserController from '../../controllers/userController';

const authRouter = express.Router();

const { login } = UserController;

authRouter.post('/signup', signupValidator, signupController);

authRouter.put('/verify/:token', signupVerifyMiddleware, signupVerifyController);

authRouter.post('/login', loginValidation, login);

export default authRouter;
