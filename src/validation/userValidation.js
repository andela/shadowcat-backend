import { check } from 'express-validator';
import Errs from './errorMessage';

const loginValidation = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Input a valid email address')
    .isEmail()
    .withMessage('Input a valid email address')
    .matches(/@andela.com$/)
    .withMessage('nonandela email'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Input password')
    .isLength({ min: 8 })
    .withMessage('Input longer password'),
  Errs.displayErrs,
];

export default loginValidation;
