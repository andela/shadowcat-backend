import express from 'express';
import { signupController, verifyTokenController } from '../../controllers';
import signupValidator from '../../validation/signup';

const authRouter = express.Router();

authRouter.post('/signup', signupValidator, signupController);

authRouter.get('/verify/:token', verifyTokenController);

export default authRouter;
