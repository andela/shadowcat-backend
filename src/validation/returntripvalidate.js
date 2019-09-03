import { check } from 'express-validator/check';
import notEmpty from '../utils/helper/notEmpty';


export default {
    returnTrip: [
        check('reason')
            .trim()
            .exists()
            .withMessage('reason is required')
            .custom(value => notEmpty(value, 'reasons for Trip is required')),
        check('departureDate')
            .trim()
            .exists()
            .withMessage('last_name is required')
            .custom(value => notEmpty(value, 'departureDate is required')),
        check('returnDate')
            .trim()
            .exists()
            .withMessage('returnDate is required', )
            .custom(value => notEmpty(value,'returnDate is required')),
        
        check('destination')
            .trim()
            .exists()
            .withMessage('destination field is required')
            
    ],
    
};
