import { check, validationResult } from 'express-validator';
import pullErrors from '../utils/helper/request.pullError';

const requestValidation = [
  check('origin')
    .exists({ checkFalsy: true })
    .withMessage('origin Origin is required')
    .isInt()
    .withMessage('origin Origin must be an integer'),
  check('destination')
    .exists({ checkFalsy: true })
    .withMessage('destination Destination is required')
    .isInt()
    .withMessage('destination Destination must be an integer'),
  check('type')
    .exists({ checkFalsy: true })
    .withMessage('type Type is required')
    .isString()
    .withMessage('type Type must be a string'),
  check('departuredate')
    .exists({ checkFalsy: true })
    .withMessage('departuredate Departure date is required'),
  check('travelreasons')
    .exists({ checkFalsy: true })
    .withMessage('travelreasons Travel Reasons is required')
    .isString()
    .withMessage('travelreasons Travel Reasons should be strings'),
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
