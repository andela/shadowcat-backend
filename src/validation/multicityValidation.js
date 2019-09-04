import { body, validationResult } from 'express-validator';
import { Op } from 'sequelize';
import models from '../models';

const { Locations } = models;

const multicityCheck = [
  body('departureDate').trim().not().isEmpty()
    .withMessage('Departure Date field is required')
    .matches(/^\d{4}([-./,:])\d{2}\1\d{2}$/, 'i')
    .withMessage('The date must follow date format YYYY-MM-DD'),
  body('returnDate').trim().not().isEmpty()
    .withMessage('Return Date field is required')
    .matches(/^\d{4}([-./,:])\d{2}\1\d{2}$/, 'i')
    .withMessage('The date must follow date format YYYY-MM-DD'),
  body('currentOfficeLocation', 'current Office Location field is required').trim().not().isEmpty(),
  body('reason').trim().not().isEmpty()
    .withMessage('Reason field is required'),
  body('tripType').trim().not().isEmpty()
    .withMessage('The trip type field is required')
    .matches(/^Multi-city$/, 'i')
    .withMessage('The trip type must match the type "Multi-city"')
];

const validateOrigin = async (request) => {
  const errors = {};
  const { currentOfficeLocation } = request.body;
  if (!currentOfficeLocation) {
    if (!errors.currentOfficeLocation) errors.currentOfficeLocation = ['currentOfficeLocation is required'];
    else errors.currentOfficeLocation.push('currentOfficeLocation is required');
  }
  if (!/^\d+$/.test(currentOfficeLocation)) {
    if (!errors.currentOfficeLocation) errors.currentOfficeLocation = ['currentOfficeLocation must be a number'];
    else errors.currentOfficeLocation.push('currentOfficeLocation must be a number');
  }
  if (!errors.currentOfficeLocation && currentOfficeLocation) {
    const locationsData = await Locations.findAll({
      attributes: ['id', 'locationName'],
      where: { id: currentOfficeLocation },
      raw: true
    });
    if (!locationsData.length) {
      if (!errors.currentOfficeLocation) errors.currentOfficeLocation = ['Current office location does not exist'];
      else errors.currentOfficeLocation.push('Current office location does not exist');
    }
    if (locationsData.length) {
      const currentOfficeData = {};
      currentOfficeData[locationsData[0].locationName] = locationsData[0].id;
      request.currentOfficeData = currentOfficeData;
    }
  }
  return errors;
};
const validateDestination = async (request) => {
  const errors = {};
  const { destination } = request.body;
  if (!destination) {
    if (!errors.destination) errors.destination = ['Destination input be an array', 'Mutiple office locations inputs are required'];
    else errors.destination.push('Destination input be an array', 'Mutiple office locations inputs are required');
  }
  if (destination) {
    if (destination.length === 0) {
      if (!errors.destination) errors.destination = ['Destination field is required'];
      else errors.destination.push('Destination field is required');
    }
    if (destination.length < 2) {
      if (!errors.destination) errors.destination = ['Multi-city trip type must have one than one destinations'];
      else errors.destination.push('Multi-city trip type must have more than one destinations');
    }
    destination.map(value => {
      if (!/^\d+$/.test(value)) {
        if (!errors.destination) {
          errors.destination = [`${value} must be a number`];
          return value;
        }
        errors.destination.push(`${value} must be a number`);
        return value;
      }
      return errors;
    });
  }
  if (!errors.destination && destination) {
    const locationsData = await Locations.findAll({
      attributes: ['id', 'locationName'],
      where: { id: { [Op.or]: [...destination] } },
      raw: true
    });
    if (!locationsData.length || (locationsData.length !== destination.length)) {
      if (!errors.destination) errors.destination = ['One or more destinations do not match andela\'s office location'];
      else errors.destination.push('One or more destinations do not match andela\'s office location');
    }
    if (locationsData.length === destination.length) {
      const destinationData = {};
      locationsData.map(data => {
        destinationData[data.locationName] = data.id;
        return destinationData;
      });
      request.destinationData = destinationData;
    }
  }
  return errors;
};

const validateInput = async (req, res, next) => {
  const errors = validationResult(req);
  const validateOriginError = await validateOrigin(req);
  const validateDestinationError = await validateDestination(req);
  const validateOriginKey = Object.keys(validateOriginError);
  const validateDestinationKey = Object.keys(validateDestinationError);
  if (!errors.isEmpty() || validateOriginKey.length || validateDestinationKey.length) {
    const errorObj = { ...validateOriginError, ...validateDestinationError };
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
export { multicityCheck, validateInput };
