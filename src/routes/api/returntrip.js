import express from 'express';
import ReturnTrip from '../../controllers/returnTrip';
import Authorization from '../../middlewares/Authorization'
import returntripvalidate from '../../validation/returntripvalidate';
import ValidationHandler from '../../utils/ValidationHandler';

const router = express.Router();

router.post('/request',
    returntripvalidate.returnTrip, ValidationHandler.validate, Authorization.authenticate, ReturnTrip.returnTripRequest );

export default router; 