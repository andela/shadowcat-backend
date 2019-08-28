import express from 'express';
import loginValidation from '../../validation/userValidation';
import UserController from '../../controllers/userController';


const authRouter = express.Router();

authRouter.post('/login', loginValidation, UserController.login);

export default authRouter;
