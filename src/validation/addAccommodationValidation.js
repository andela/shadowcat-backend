import { body, validationResult } from 'express-validator';

const accommodationCheck = [
  body('name').isLength({ min: 5 })
    .withMessage('Accommodation must be at least 5 characters long')
    .matches(/^[A-z0-9_]+$/, 'i')
    .withMessage('no spaces are allowed, \'_\' is the only special character allowed'),
  body('address').trim().not().isEmpty()
    .withMessage('Address field is required'),
  body('description').trim().not().isEmpty()
    .withMessage('Briefly describe the facility'),
  body('state').trim().not().isEmpty()
    .withMessage('Kindly provide the state where facility is located'),
  body('country').trim().not().isEmpty()
    .withMessage('Kindly provide the country where facility is located'),
  body('services').trim().not().isEmpty()
    .withMessage('Services field cannot be empty'),
  body('amenities').trim().not().isEmpty()
    .withMessage('Amenities field cannot be empty'),
];

const validateServices = async (request) => {
  const errors = { services: [] };
  let { services } = request.body;
  if (services)services = JSON.parse(services);
  request.body.services = services;
  if (!Array.isArray(services)) errors.services.push('services must be an array of expected services offered');

  if (errors.services.length === 0) delete errors.services;
  return errors;
};
const validateAmenities = async (request) => {
  const errors = { amenities: [] };
  let { amenities } = request.body;
  amenities = JSON.parse(amenities);
  request.body.amenities = amenities;
  if (!Array.isArray(amenities)) errors.amenities.push('amenities must be an array of expected amenities accessible on the facility');

  if (errors.amenities.length === 0) delete errors.amenities;
  return errors;
};

/**
 *@description Validates all the inputs
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Function} next
 * @memberof Validation
 */
const validateAccommodationInput = (req, res, next) => {
  const errors = validationResult(req);
  const validateServicesError = validateServices(req);
  const validateAmenitiesError = validateAmenities(req);
  const validateServicesErrorKeys = Object.keys(validateServicesError);
  const validateAmenitiesErrorKeys = Object.keys(validateAmenitiesError);
  if (!errors.isEmpty() || validateServicesErrorKeys.length || validateAmenitiesErrorKeys.length) {
    const errorObj = { ...validateServicesError, ...validateAmenitiesError };
    errors.array().map(err => {
      if (errorObj[err.param]) return errorObj[err.param].push(err.msg);
      errorObj[err.param] = [err.msg];
      return errorObj;
    });
    return res.status(400).json({
      status: 'error',
      error: errorObj
    });
  }
  return next();
};

export { accommodationCheck, validateAccommodationInput };
