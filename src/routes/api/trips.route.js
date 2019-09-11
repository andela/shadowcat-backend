import express from 'express';
import { Trips } from '../../controllers';
import { Authentication } from '../../middlewares';
import {
  onewayCheck, onewayValidateInput, multicityCheck, multicityValidateInput
} from '../../validation';
import { validate, validateRequestType } from '../../utils/helper/tripTypeChecker';

const { tripRequest } = Trips;
const { authenticate } = Authentication;
const router = express.Router();

router.post('/request', authenticate, validateRequestType, validate(onewayCheck(), 'one-way'),
  onewayValidateInput, validate(multicityCheck(), 'Multi-city'), multicityValidateInput, tripRequest);

export default router;
