import express from 'express';
import { Trips } from '../../controllers';
import { Authentication } from '../../middlewares';
import { multicityCheck, validateInput } from '../../validation';

const { multiCityRequest, getUserRequestHistory } = Trips;
const { authenticate } = Authentication;

const router = express.Router();

router.post('/request', authenticate, multicityCheck, validateInput, multiCityRequest);

router.get(
  '/request',
  authenticate,
  getUserRequestHistory
);

export default router;
