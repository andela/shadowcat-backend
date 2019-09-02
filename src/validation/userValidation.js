import { check, validationResult } from 'express-validator';
import pullErrors from '../utils/helpers/pullErrors';
import { loginProfileErrors } from '../utils/constants/errorMessages';

const loginValidation = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage(`email ${loginProfileErrors.undefinedEmail}`)
    .isEmail()
    .withMessage(`email ${loginProfileErrors.invalidEmail}`)
    .matches(/@andela.com$/)
    .withMessage(`email ${loginProfileErrors.nonAndelanEmail}`),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage(`password ${loginProfileErrors.undefinedPassword}`),
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
