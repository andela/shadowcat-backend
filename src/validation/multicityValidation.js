import { body, validationResult } from 'express-validator';

const multicityCheck = [
  body('departureDate').trim().not().isEmpty()
    .withMessage('Departure Date field is required')
    .matches(/^\d{4}([-./,:])\d{2}\1\d{2}$/, 'i')
    .withMessage('The date must follow date format YYYY-MM-DD'),
  body('returnDate').trim().not().isEmpty()
    .withMessage('Return Date field is required')
    .matches(/^\d{4}([-./,:])\d{2}\1\d{2}$/, 'i')
    .withMessage('The date must follow date format YYYY-MM-DD'),
  body('currentOfficeLocation').trim().not().isEmpty()
    .withMessage('current Office Location field is required'),
  body('reason').trim().not().isEmpty()
    .withMessage('Reason field is required'),
  body('tripType').trim().not().isEmpty()
    .withMessage('The trip type field is required')
    .matches(/^Multi-city$/, 'i')
    .withMessage('The trip type must match the type "Multi-city"')
];

const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorResult = errors.array().map(err => `${err.param}: ${err.msg}`);
    return res.status(400).json({
      status: 'error',
      message: errorResult
    });
  }
  return next();
};
export { multicityCheck, validateInput };
