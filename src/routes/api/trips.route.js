import express from 'express';
import { Trips } from '../../controllers';
import { Authentication } from '../../middlewares';
import { multicityCheck, validateInput } from '../../validation';

const { authenticate } = Authentication;
const { multiCityRequest, getManagerTrips } = Trips;
const router = express.Router();

router.post('/request', authenticate, multicityCheck, validateInput, multiCityRequest);
router.get('/get_trips/:id', getManagerTrips);

export default router;
