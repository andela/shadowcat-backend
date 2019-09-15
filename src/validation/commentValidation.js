import { check, validationResult } from 'express-validator';
import pullErrors from '../utils/helpers/pullErrors';
import { userProfileErrors } from '../utils/constants/errorMessages';

const commentValidation = [
  check('comment')
    .exists({ checkFalsy: true })
    .withMessage(`comment ${userProfileErrors.undefinedComment}`)
    .isAscii()
    .withMessage(`comment ${userProfileErrors.invalidComment}`),
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

export default commentValidation;
