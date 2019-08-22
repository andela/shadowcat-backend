import { check } from 'express-validator';

const loginValidation = [
  check('email').isEmail().trim().withMessage('input a valid email address'),
  check('email').not().isEmpty().withMessage('input email address'),
  check('password').not().isEmpty().withMessage('input password'),
];

export {loginValidation } ;