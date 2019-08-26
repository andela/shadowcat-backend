import express from 'express';
import UserController from '../../controllers/passwordReset';
import Authenticator from '../../middlewares/passwordResetMiddleware';
import validate from '../../validation/validateResetPassword';
import UserValidator from '../../validation/passwordResetValidate';

const passwordResetRouter = express.Router();

const { getAUser, updatePassword } = UserController;
const { isTokenValid, doesPasswordMatch } = Authenticator;


const { emailValidator, passwordUpdateValidator } = UserValidator;

// to get email
passwordResetRouter.post('/forgot_password', emailValidator, validate, getAUser);
passwordResetRouter.patch('/forgot_password/:token', isTokenValid, passwordUpdateValidator, validate, doesPasswordMatch, updatePassword);


export default passwordResetRouter;
