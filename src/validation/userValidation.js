import { check } from 'express-validator';
import Errors from './errorMessage';

const loginValidation = [
  check('email').isEmail().trim().withMessage('Input a valid email address'),
  check('email').not().isEmpty().withMessage('Input email address'),
  check('email').matches(/@andela.com$/).withMessage('Input an Andela email'),
  check('password').not().isEmpty().withMessage('Input password'),
  check('password').isLength({ min: 8 }).withMessage('Input longer password'),
  Errors.displayErrs,
];

export default loginValidation;
