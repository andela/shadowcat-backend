import express from 'express';
import { Trips } from '../../controllers';
import { Authentication } from '../../middlewares';
import { multicityCheck, validateInput } from '../../validation';
// import validateRequestType from '../../utils/helper/validateRequestType';

const { tripRequest } = Trips;
const { authenticate } = Authentication;


const router = express.Router();

router.post('/request', authenticate, multicityCheck, validateInput, tripRequest);

export default router;
