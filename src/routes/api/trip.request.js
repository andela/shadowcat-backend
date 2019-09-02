import express from 'express';
import tripController from '../../controllers/request';
import Auth from '../../middleware/auth.js'

const tripRequest = express.Router();

const { oneWayRequestValidator } = requestValidator;

tripRequest.post('/trip_request', Auth.authenticate, oneWayRequestValidator, tripController.oneWay);

export default tripRequest;
