import { check, validationResult } from 'express-validator';
import pullErrors from '../utils/helper/pulledError';
import { loginErrors } from '../utils/errorMessage';

const loginValidation = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage(`email ${loginErrors.undefinedEmail}`)
    .isEmail()
    .withMessage(`email ${loginErrors.invalidEmail}`)
    // .matches(/@andela.com$/)
    .withMessage(`email ${loginErrors.nonAndelanEmail}`),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage(`password ${loginErrors.undefinedPassword}`),
  async (req, res, next) => {
    const { errors } = validationResult(req);
    if (errors.length) {
      const pulledErrors = pullErrors(errors);
      return res.status(400).json({
        status: 400,
        error: pulledErrors
      });
    }
    return next();
  }
];

export default loginValidation;
