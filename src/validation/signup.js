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
    .matches(/@andela.com$/)
    .withMessage(signupErrors.nonAndelanEmail),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage(signupErrors.undefinedPassword)
    .isLength({ min: 8 })
    .withMessage(signupErrors.invalidPassword)
    // https://stackoverflow.com/questions/4429847/check-if-string-contains-both-number-and-letter-at-least
    // https://stackoverflow.com/questions/388996/regex-for-javascript-to-allow-only-alphanumeric
    .matches(/^(?=.*[a-z])(?=.*[0-9])([a-z0-9]+$)/i)
    .withMessage(signupErrors.alphaNumericPassword),
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
        error: pulledErrors
      });
    }
    const { User } = models;
    const { email } = req.body;
    const users = await User.findOne({ where: { email } });

    // User already exists
    if (users !== null) {
      return res.status(409).json({
        status: 409,
        error: signupErrors.existingUser
      });
    }
    return next();
  }
];

export default signupValidator;
