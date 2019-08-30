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
];

const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array()[0].msg;
    return res.status(422).json({
      status: 'error',
      message: errorMessage
    });
  }
  return next();
};
export { multicityCheck, validateInput };
