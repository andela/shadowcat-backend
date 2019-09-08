import express from 'express';
import { Trips } from '../../controllers';
import { Authentication } from '../../middlewares';
import { multicityCheck, validateInput, returntripvalidate} from '../../validation';

const { multiCityRequest, returnTripRequest } = Trips;
const { authenticate } = Authentication;


const router = express.Router();

router.post('/request', authenticate, returnTripRequest, returntripvalidate, multicityCheck, validateInput, multiCityRequest);

export default router;
