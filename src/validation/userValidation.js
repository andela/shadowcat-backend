import { check } from 'express-validator';
import Errors from './errorMessage';

const loginValidation = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage({ email: 'Input email' })
    .isEmail()
    .withMessage({ email: 'Input a valid email address' })
    .matches(/@andela.com$/)
    .withMessage({ email: 'Andela email required' }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage({ password: 'Input password' })
    .isLength({ min: 8 })
    .withMessage({ password: 'Input longer password' }),
  Errors.displayErrs,
];

export default loginValidation;
