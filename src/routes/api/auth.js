import express from 'express';
import loginValidation from '../../validation/userValidation';
import UserController from '../../controllers/userController';


const authRouter = express.Router();
const { login } = UserController;

authRouter.post('/login', loginValidation, login);

export default authRouter;
