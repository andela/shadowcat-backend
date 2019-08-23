import express from 'express';
import UserController from '../../controllers/userController';
import  loginValidation  from '../../validation/userValidation';

const authRouter = express.Router();

authRouter.post('/login', loginValidation, UserController.login);

export default authRouter;
