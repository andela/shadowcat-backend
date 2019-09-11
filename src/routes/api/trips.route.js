import express from 'express';
import { Trips } from '../../controllers';
import { Authentication } from '../../middlewares';
import { multicityCheck, validateInput, userRequestHistoryValidator } from '../../validation';

const { authenticate } = Authentication;
const { multiCityRequest, getUserRequestHistory, getManagerTrips } = Trips;
const router = express.Router();

router.post('/request', authenticate, multicityCheck, validateInput, multiCityRequest);
router.get('/get_trips/:id', getManagerTrips);

router.get(
  '/request',
  authenticate, userRequestHistoryValidator, getUserRequestHistory
);

export default router;
