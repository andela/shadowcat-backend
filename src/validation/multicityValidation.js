import { body, validationResult } from 'express-validator';
import { Op } from 'sequelize';
import models from '../models';
import datecheck from '../utils/dateCheck';
import errorAssignment from '../utils/errorAssignment';

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
  body('reason').trim().not().isEmpty()
    .withMessage('Reason field is required'),
  body('tripType').trim().not().isEmpty()
    .withMessage('The trip type field is required')
    .matches(/^Multi-city$/, 'i')
    .withMessage('The trip type must match the type "Multi-city"')
];
/**
 *@description A class that handles all validations
 * @class Validation
 */
class Validation {
  /**
 *@description A validation for the date
 * @static
 * @param {Object} request
 * @returns {Object} errors
 * @memberof Validation
 */
  static validateDate(request) {
    let errors = {};
    const { departureDate, returnDate } = request.body;
    const duration = datecheck(departureDate, returnDate);
    if (duration === 'negative value') errors = { ...errorAssignment('Departure date can not be less than Today\'s date', 'departureDate') };

    if (!duration) errors = { ...errorAssignment('Departure date can not be above or the same as the return date', 'departureDate') };
    return errors;
  }

  /**
 *@description A validation check for the current location
 * @static
 * @param {Object} request
 * @returns {Object} error
 * @memberof Validation
 */
  static async validateOrigin(request) {
    let errors = {};
    const { currentOfficeLocation } = request.body;
    if (!currentOfficeLocation) errors = { ...errorAssignment('currentOfficeLocation is required', 'currentOfficeLocation') };

    if (!/^\d+$/.test(currentOfficeLocation)) {
      errors = { ...errorAssignment('currentOfficeLocation must be a number', 'currentOfficeLocation') };
    }
    if (!errors.currentOfficeLocation && currentOfficeLocation) {
      const locationsData = await Locations.findAll({
        attributes: ['id', 'locationName'],
        where: { id: currentOfficeLocation },
        raw: true
      });
      if (!locationsData.length) errors = { ...errorAssignment('Current office location does not exist', 'currentOfficeLocation') };
      if (locationsData.length) {
        const currentOfficeData = {};
        currentOfficeData[locationsData[0].locationName] = locationsData[0].id;
        request.currentOfficeData = currentOfficeData;
      }
    }
    return errors;
  }

  /**
 *@description A validation for destination
 * @static
 * @param {Object} request
 * @returns {Object} errors
 * @memberof Validation
 */
  static async validateDestination(request) {
    let errors = {};
    let { destination } = request.body;
    if (!destination) errors = { ...errorAssignment('Destination input must be an array', 'Mutiple office locations inputs are required', 'destination') };

    if (!Array.isArray(destination)) errors = { ...errorAssignment('Destination field must be an array', 'destination') };

    if (destination && Array.isArray(destination)) {
      if (destination.length === 0) errors = { ...errorAssignment('Destination field is required', 'destination') };

      if (destination.length < 2) errors = { ...errorAssignment('Multi-city trip type must have one than one destinations', 'destination') };

      destination.map(value => {
        if (!/^\d+$/.test(value)) errors = { ...errorAssignment(`${value} must be a number`, 'destination') };

        return value;
      });
      // eslint-disable-next-line
    destination = destination.filter((value, index) => {
        if (destination.indexOf(value) === index) {
          return value;
        }
        errors = { ...errorAssignment(`${value} must be unique to the request`, 'destination') };
      });
    }
    if (!errors.destination && destination) {
      const locationsData = await Locations.findAll({
        attributes: ['id', 'locationName'],
        where: { id: { [Op.or]: [...destination] } },
        raw: true
      });
      if (!locationsData.length || (locationsData.length !== destination.length)) errors = { ...errorAssignment('One or more destinations do not match andela\'s office location', 'destination') };

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
  }

  /**
 *@description Validates all the inputs
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Function} next
 * @memberof Validation
 */
  static async validateInput(req, res, next) {
    const errors = validationResult(req);
    const validateOriginError = await Validation.validateOrigin(req);
    const validateDestinationError = await Validation.validateDestination(req);
    const validateDateError = Validation.validateDate(req);
    const validateDateKey = Object.keys(validateDateError);
    const validateOriginKey = Object.keys(validateOriginError);
    const validateDestinationKey = Object.keys(validateDestinationError);
    if (!errors.isEmpty()
   || validateOriginKey.length
   || validateDestinationKey.length
   || validateDateKey.length) { // eslint-disable-next-line
      const errorObj = { ...validateOriginError, ...validateDestinationError, ...validateDateError };
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
  }
}
const { validateInput } = Validation;
export { multicityCheck, validateInput };
