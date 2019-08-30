import express from 'express';
import { MultiCityTripsController } from '../../controllers';
import { Authentication } from '../../middlewares';
import { multicityCheck, validateInput } from '../../validation';

const { multiCityRequest } = MultiCityTripsController;
const { authenticate } = Authentication;


const router = express.Router();

router.post('/request', multicityCheck, validateInput, authenticate, multiCityRequest);

export default router;
