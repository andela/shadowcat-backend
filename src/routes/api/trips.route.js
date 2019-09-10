import express from 'express';
import { Trips } from '../../controllers';
import { Authentication } from '../../middlewares';
import {
  onewayCheck, onewayValidateInput, multicityCheck, multicityValidateInput
} from '../../validation';
import validateRequestType from '../../utils/helper/validateRequestType';

const { tripRequest } = Trips;
const { authenticate } = Authentication;


const router = express.Router();

router.post('/request', authenticate, validateRequestType, onewayCheck, onewayValidateInput, multicityCheck, multicityValidateInput, tripRequest);

export default router;
