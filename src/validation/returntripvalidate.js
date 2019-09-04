import { check } from 'express-validator/check';
import notEmpty from '../utils/helper/notEmpty';


export default {
    returnTrip: [
        check('reason')
            .trim()
            .exists()
            .custom(value => notEmpty(value, 'reasons for Trip is required')),
        check('departureDate')
            .trim()
            .exists()
            .matches(/^\d{4}([-./,:])\d{2}\1\d{2}$/, 'i')
            .custom(value => notEmpty(value, 'departureDate is required')),
        check('returnDate')
            .trim()
            .exists()
            .matches(/^\d{4}([-./,:])\d{2}\1\d{2}$/, 'i')
            .custom(value => notEmpty(value,'returnDate is required')),
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
        check('accomodation')
            .trim()
            .exists()
            .withMessage('accomodation must be specified')
            .custom(value => notEmpty(value, 'accomodation is required')),   

    ],
    
};
