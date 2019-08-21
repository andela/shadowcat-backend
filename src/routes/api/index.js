import express from 'express';
import UserController from '../../controllers';
import Authenticator from '../../middlewares';
import validate from '../../validation/validate';
import UserValidator from '../../validation';

const usersRouter = express.Router();

const { getAUser, updatePassword } = UserController;
const { isTokenValid, doesPasswordMatch } = Authenticator;


const { emailValidator, passwordUpdateValidator } = UserValidator;

// to get email
usersRouter.post('/forgot_password', emailValidator, validate, getAUser);
usersRouter.patch('/forgot_password/:token', isTokenValid, passwordUpdateValidator, validate, doesPasswordMatch, updatePassword);


export default usersRouter;
