import { check } from 'express-validator';

const loginValidation = [
  check('email').isEmail().trim().withMessage('Input a valid email address'),
  check('email').not().isEmpty().withMessage('Input email address'),
  check('password').not().isEmpty().withMessage('Input password'),
];

export default { loginValidation };
