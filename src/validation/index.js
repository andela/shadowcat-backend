
import { body } from 'express-validator';

const userValidator = {
  passwordUpdateValidator: [
    body('newPassword')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('New password is required.')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 6 to 20 characters long.')
      .isAlphanumeric()
      .withMessage('Password must be contain alphabets and numbers'),
    body('confirmPassword')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Confirm password is required.')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 to 20 characters long.')
      .isAlphanumeric()
      .withMessage('Password must be contain alphabets and numbers'),
  ],
  emailValidator: [
    body('email')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Email is required.')
      .isEmail()
      .isLowercase()
      .withMessage('Email must be in lowercase')
      // .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(andela.com)$/)
      .withMessage('Invalid email address'),

  ],
};

export default userValidator;
