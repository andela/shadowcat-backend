import { check, validationResult } from 'express-validator';
import { userRequestHistoryErrors } from '../utils/constants/errorMessages';
import pullErrors from '../utils/helpers/pullErrors';

/**
 * The user request history validator
 * @param { object } req - The request object
 * @param { object } res - The response object
 * @param { function } next - Pass to next middleware
 * @return { void }
 */
export const userRequestHistory = [
  check('limit')
    .optional()
    .isNumeric()
    .withMessage(`limit ${userRequestHistoryErrors.nonNumericLimit}`),
  check('offset')
    .optional()
    .isNumeric()
    .withMessage(`offset ${userRequestHistoryErrors.nonNumericOffset}`),
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

export default userRequestHistory;
