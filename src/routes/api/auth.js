import express from 'express';
import { signupController, signupVerifyController } from '../../controllers';
import signupValidator from '../../validation/signup';
import signupVerifyMiddleware from '../../middlewares';

const authRouter = express.Router();

authRouter.post('/signup', signupValidator, signupController);

authRouter.put('/verify/:token', signupVerifyMiddleware, signupVerifyController);

export default authRouter;
