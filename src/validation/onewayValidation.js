import { body, validationResult } from 'express-validator';
import pullErrors from '../utils/helper/request.pullError';

const onewayCheck = body('tripType').matches(/^(one-way)$/, 'i') ? [
  body('currentOfficeLocation')
    .exists({ checkFalsy: true })
    .withMessage('currentOfficeLocation Current Office Location is required')
    .isInt()
    .withMessage('currentOfficeLocation Current Office Location must be an integer'),
  body('destination')
    .exists({ checkFalsy: true })
    .withMessage('destination Destination is required')
    .isInt()
    .withMessage('destination Destination must be an integer'),
  body('departureDate')
    .exists({ checkFalsy: true })
    .withMessage('departureDate Departure date is required'),
  body('travelreasons')
    .exists({ checkFalsy: true })
    .withMessage('travelReasons Travel Reasons is required')
    .isString()
    .withMessage('travelReasons Travel Reasons should be strings'),
  body('accommodation')
    .exists({ checkFalsy: true })
    .withMessage('accommodation Accommodation is required')
    .isInt()
    .withMessage('accommodation Accommodation must be an integer'),
] : [];
/**
 *@description A class that handles all validations
 * @class Validation
 */
class Validation {
  /**
 *@description Validates all the inputs
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Function} next
 * @memberof Validation
 */
  static async onewayValidateInput(req, res, next) {
    if (req.body.tripType !== 'one-way') return next();
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
}
const { onewayValidateInput } = Validation;
export { onewayCheck, onewayValidateInput };
