import express from 'express';
import ReturnTrip from '../../controllers/returnTrip';
import returntripvalidate from '../../validation/returntripvalidate';
import ValidationHandler from '../../utils/ValidationHandler';
import Auth from '../../middlewares/auth';


const router = express.Router();

router.post('/request', Auth.authenticate, returntripvalidate.returnTrip, ValidationHandler.validate,  ReturnTrip.returnTripRequest );

export default router; 