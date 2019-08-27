import { check } from 'express-validator';
import { loginErrors } from '../utils/errorMessage';
import Errors from './errorMessage';

const loginValidation = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage(`email: ${loginErrors.undefinedEmail}`)
    .isEmail()
    .withMessage(`email: ${loginErrors.invalidEmail}`)
    .matches(/@andela.com$/)
    .withMessage(`email: ${loginErrors.nonAndelanEmail}`),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage(`password: ${loginErrors.undefinedPassword}`)
    .isLength({ min: 8 })
    .withMessage(`password: ${loginErrors.invalidPassword}`),
  Errors.displayErrs,
];

export default loginValidation;
