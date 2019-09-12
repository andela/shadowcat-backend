import express from 'express';
import { Trips } from '../../controllers';
import { Authentication } from '../../middlewares';
import {
  // eslint-disable-next-line max-len
  onewayCheck, onewayValidateInput, multicityCheck, multicityValidateInput, userRequestHistoryValidator
} from '../../validation';
import { validate, validateRequestType } from '../../utils/helper/tripTypeChecker';

const { tripRequest, getUserRequestHistory, getManagerTrips } = Trips;
const { authenticate } = Authentication;

const router = express.Router();

router
  .post('/request', authenticate, validateRequestType, validate(onewayCheck(), 'one-way'),
    onewayValidateInput, validate(multicityCheck(), 'Multi-city'), multicityValidateInput, tripRequest)

  .get('/get_trips/:id', getManagerTrips)

  .get(
    '/request',
    authenticate, userRequestHistoryValidator, getUserRequestHistory
  );

export default router;