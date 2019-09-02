import { check, validationResult } from 'express-validator';
import pullErrors from '../utils/helper/request.pullError';

const requestValidation = [
  check('currentOfficeLocation')
    .exists({ checkFalsy: true })
    .withMessage('currentOfficeLocation CurrentO ffice Location is required')
    .isInt()
    .withMessage('currentOfficeLocation Current Office Location must be an integer'),
  check('destination')
    .exists({ checkFalsy: true })
    .withMessage('destination Destination is required')
    .isInt()
    .withMessage('destination Destination must be an integer'),
  check('type')
    .exists({ checkFalsy: true })
    .withMessage('tripType Trip Type is required')
    .isString()
    .withMessage('tripType Trip Type must be a string'),
  check('departureDate')
    .exists({ checkFalsy: true })
    .withMessage('departureDate Departure date is required'),
  check('travelreasons')
    .exists({ checkFalsy: true })
    .withMessage('travelReasons Travel Reasons is required')
    .isString()
    .withMessage('travelReasons Travel Reasons should be strings'),
  check('accommodation')
    .exists({ checkFalsy: true })
    .withMessage('accommodation Accommodation is required')
    .isInt()
    .withMessage('accommodation Accommodation must be an integer'),
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

export default requestValidation;
