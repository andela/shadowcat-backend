import { check, validationResult } from 'express-validator';
import { signupErrors } from '../utils/constants/errorMessages';
import pullErrors from '../utils/helpers/pullErrors';
import models from '../models';

/**
 * The signup controller
 * @param { object } req - The request object
 * @param { object } res - The response object
 * @param { function } next - Pass to next middleware
 * @return { void }
 */
const signupValidator = [
  check('firstname')
    .exists({ checkFalsy: true })
    .withMessage(signupErrors.undefinedFirstName)
    .isAlpha()
    .withMessage(signupErrors.invalidFirstName),
  check('lastname')
    .exists({ checkFalsy: true })
    .withMessage(signupErrors.undefinedLastName)
    .isAlpha()
    .withMessage(signupErrors.invalidLastName),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage(signupErrors.undefinedEmail)
    .isEmail()
    .withMessage(signupErrors.invalidEmail)
    .matches(/andela.com$/)
    .withMessage(signupErrors.nonAndelanEmail),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage(signupErrors.undefinedPassword)
    .isLength({ min: 8 })
    .withMessage(signupErrors.invalidPassword),
  check('phone')
    .exists({ checkFalsy: true })
    .withMessage(signupErrors.undefinedPhone)
    .isNumeric()
    .withMessage(signupErrors.invalidPhone),

  async (req, res, next) => {
    const { errors } = validationResult(req);
    if (errors.length) {
      const pulledErrors = pullErrors(errors);
      return res.status(400).json({
        status: 400,
        error: pulledErrors[0]
      });
    }
    const { User } = models;
    const { email } = req.body;
    const users = await User.findOne({ where: { email } });

    // User already exists
    if (users !== null) {
      return res.status(400).json({
        status: 409,
        error: signupErrors.existingUser
      });
    }
    return next();
  }
];

export default signupValidator;
