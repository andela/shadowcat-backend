import { body, validationResult } from 'express-validator';
import pullErrors from './request.pullError';

const validateRequestType = [
  body('tripType')
    .exists({ checkFalsy: true })
    .withMessage('tripType Trip Type is required')
    .isString()
    .withMessage('tripType Trip Type must be a string')
    .matches(/^(one-way|return|Multi-city)$/, 'i')
    .withMessage('tripType Trip Type must be one of [one-way, return, Multi-city]'),
  async (req, res, next) => {
    const { errors } = validationResult(req);
    if (errors.length) {
      const pulledErrors = pullErrors(errors);
      return res.status(400).json({
        status: 400,
        error: pulledErrors
      });
    }
    global.userTripType = req.body.userTripType;
    return next();
  }
];
export default validateRequestType;
