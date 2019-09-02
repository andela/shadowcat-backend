import express from 'express';
import ReturnTrip from '../../controllers/returnTrip';
import { Authorization } from '../../middlewares';
// import { multicityCheck, validateInput } from '../../validation';

// const { multiCityRequest } = MultiCityTripsController;
//const { authenticate } = Authentication;


const router = express.Router();

router.post('/request', Authorization.authenticate, //multicityCheck, validateInput, 
    ReturnTrip.returnTripRequest);

export default router; 