import { check } from 'express-validator/check';
import notEmpty from '../utils/helper/notEmpty';
import { Op } from 'sequelize';
import models from '../models';
import {  validationResult } from 'express-validator';


const returnTripCheck = () => [
    check('reason')
        .trim()
        .exists()
        .custom(value => notEmpty(value, 'reasons for Trip is required')),
    check('departureDate')
        .trim()
        .exists()
        .matches(/^\d{4}([-./,:])\d{2}\1\d{2}$/, 'i')
        .withMessage('The date must follow date format YYYY-MM-DD')
        .custom(value => notEmpty(value, 'departureDate is required')),
    check('returnDate')
        .trim()
        .exists()
        .matches(/^\d{4}([-./,:])\d{2}\1\d{2}$/, 'i')
        .withMessage('The date must follow date format YYYY-MM-DD')
        .custom(value => notEmpty(value, 'returnDate is required')),
    check('destination')
        .trim()
        .exists()
        .custom(value => notEmpty(value, 'destination is required')),
    check('currentOfficeLocation')
        .trim()
        .exists()
        .withMessage('currentOfficeLocation must be specified')
        .custom(value => notEmpty(value, 'currentOfficeLocation is required')),
    check('tripType')
        .trim()
        .exists()
        .matches(/^Return-Trip$/, 'i')
        .withMessage('The trip type must match the type "Return-Trip"')
        .custom(value => notEmpty(value, 'The trip type must match the type "Return-Trip"')),
    check('accommodation')
        .trim()
        .exists()
        .withMessage('accomodation must be specified')
        .custom(value => notEmpty(value, 'accomodation is required')),

];
    
class Validation {
    /**
   *@description A validation for fields
   * @static
   * @param {Object} req
   * @param {String} value
   * @param {String} field
   * @returns {Object} errors
   * @memberof Validation
   */
    static async validateField(req, value, field) {
        const errors = {};
        if (!value) {
            if (!errors[`${field}`]) errors[`${field}`] = [field === 'currentOfficeLocation' ? 'Current Office Location is required' : 'Destination is required'];
            else errors[`${field}`].push(field === 'currentOfficeLocation' ? 'Current Office Location is required' : 'Destination is required');
        }
        if (!/^\d+$/.test(value)) {
            if (!errors[`${field}`]) errors[`${field}`] = [field === 'currentOfficeLocation' ? 'Current Office Location must be a number' : 'Destination must be a number'];
            else errors[`${field}`].push(field === 'currentOfficeLocation' ? 'Current Office Location must be a number' : 'Destination must be a number');
        }
        if (req.body.currentOfficeLocation !== '' && req.body.destination !== '' && req.body.currentOfficeLocation === req.body.destination) {
            if (!errors[`${field}`]) errors[`${field}`] = [field === 'currentOfficeLocation' ? 'Current Office Location and Destination cannot be the same' : 'Destination and Current Office Location cannot be the same'];
            else errors[`${field}`].push(field === 'currentOfficeLocation' ? 'Current Office Location and Destination cannot be the same' : 'Destination and Current Office Location cannot be the same');
        }
        if (!errors[`${field}`]) {
            const locationsData = await Locations.findAll({
                attributes: ['id', 'locationName'],
                where: { id: value },
                raw: true
            });
            if (!locationsData.length) {
                if (!errors[`${field}`]) errors[`${field}`] = [field === 'currentOfficeLocation' ? 'Current Office Location does not match Andela\'s location' : 'Destination does not match Andela\'s location'];
                else errors[`${field}`].push(field === 'currentOfficeLocation' ? 'Current Office Location does not match Andela\'s location' : 'Destination does not match Andela\'s location');
            }
            if (locationsData.length) {
                const fielData = {};
                fielData[locationsData[0].locationName] = locationsData[0].id;
                req[`${field}Data`] = fielData;
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
        const errors = {};
        let { destination } = request.body;
        if (!destination) {
            if (!errors.destination) errors.destination = ['Destination input must be an array', 'Mutiple office locations inputs are required'];
            else errors.destination.push('Destination input must be an array', 'Mutiple office locations inputs are required');
        }
        if (!Array.isArray(destination)) {
            if (!errors.destination) errors.destination = ['Destination field must be an array'];
            else errors.destination.push('Destination field must be an array');
        }
        if (destination && Array.isArray(destination)) {
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
                    } else {
                        errors.destination.push(`${value} must be a number`);
                    }
                }
                return value;
            });
            // eslint-disable-next-line
            destination = destination.filter((value, index) => {
                if (destination.indexOf(value) === index) {
                    return value;
                }
                if (!errors.destination) {
                    errors.destination = [`${value} must be unique to the request`];
                } else {
                    errors.destination.push(`${value} must be unique to the request`);
                }
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
    }

    /**
   *@description A validation check for the current location
   * @static
   * @param {Object} req
   * @returns {Object} error
   * @memberof Validation
   */
    static async validateAccommodation(req) {
        const errors = {};
        const { accommodation, destination } = req.body;
        if (!accommodation) {
            if (!errors.accommodation) errors.accommodation = ['Accommodation is required'];
            else errors.accommodation.push('Accommodation is required');
        }
        if (!/^\d+$/.test(accommodation)) {
            if (!errors.accommodation) errors.accommodation = ['Accommodation must be a number'];
            else errors.accommodation.push('Accommodation must be a number');
        }
        if (!errors.accommodation && accommodation && destination && typeof destination === 'number') {
            const accommodationData = await Accommodation.findAll({
                attributes: ['id', 'locationId', 'accommodationName'],
                where: { id: accommodation, locationId: destination },
                raw: true
            });
            if (!accommodationData.length) {
                if (!errors.accommodation) errors.accommodation = ['This accommodation does not exist in the chosen destination'];
                else errors.accommodation.push('This accommodation does not exist in the chosen destination');
            }
            if (accommodationData.length) {
                const accommodationReqData = {};
                accommodationReqData[accommodationData[0].accommodationName] = accommodationData[0].id;
                req.accommodationReqData = accommodationData;
            }
        }
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
        const errors = {};
        const { currentOfficeLocation } = request.body;
        if (!currentOfficeLocation) {
            if (!errors.currentOfficeLocation) errors.currentOfficeLocation = ['urrentOfficeLocation is required'];
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
    static async returnTripValidateInput(req, res, next) {
        if (req.body.tripType !== 'Return-Trip') return next();
        const errors = validationResult(req);
        const validateOriginError = await Validation.validateField(req, req.body.currentOfficeLocation, 'currentOfficeLocation');
        const validateDestinationError = await Validation.validateField(req, req.body.destination, 'destination');
        const validateAccommodationError = await Validation.validateAccommodation(req);
        const validateOriginKey = Object.keys(validateOriginError);
        const validateDestinationKey = Object.keys(validateDestinationError);
        const validateAccommodationKey = Object.keys(validateAccommodationError);
        if (!errors.isEmpty()
            || validateOriginKey.length
            || validateDestinationKey.length || validateAccommodationKey.length) {
    
            const errorObj = { ...validateOriginError, ...validateDestinationError, ...validateAccommodationError };
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
const { returnTripValidateInput } = Validation;
export { returnTripCheck, returnTripValidateInput };

