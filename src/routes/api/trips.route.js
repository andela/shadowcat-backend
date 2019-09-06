import express from 'express';
import { Trips } from '../../controllers';
import { Authentication } from '../../middlewares';
import { multicityCheck, validateInput } from '../../validation';

const { authenticate } = Authentication;


const router = express.Router();

const tripRoute = (io = null) => {
  const notify = new Trips(io);
  const { multiCityRequest, getManagerTrips } = notify;
  router.post('/request', authenticate, multicityCheck, validateInput, multiCityRequest);
  router.get('/get_trips/:id', getManagerTrips);
  return router;
};


export default tripRoute;
