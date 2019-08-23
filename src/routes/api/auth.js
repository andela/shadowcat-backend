import express from 'express';
import { signupController, validateController } from '../../controllers';
import signupValidator from '../../validation/signup';

const authRouter = express.Router();

authRouter.post('/signup', signupValidator, signupController);

authRouter.put('/verify/:token', validateController);

export default authRouter;
