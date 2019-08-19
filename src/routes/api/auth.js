import express from 'express';
import { signupController } from '../../controllers';

const authRouter = express.Router();
authRouter.get('/signup', signupController);

export default authRouter;
