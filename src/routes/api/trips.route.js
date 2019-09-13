import express from 'express';
import { Trips } from '../../controllers';
import { Authentication, RoleStatus, tripAuthenticator } from '../../middlewares';
import managerHelper from '../../utils/helpManager/managerHelper';

import {
  onewayCheck,
  onewayValidateInput,
  multicityCheck,
  multicityValidateInput,
  userRequestHistoryValidator
} from '../../validation';
import { validate, validateRequestType } from '../../utils/helper/tripTypeChecker';

const { authenticate } = Authentication;
const { getPermission } = RoleStatus;
const permissionCheck = getPermission('rejectRequest');
const {
  getUserRequestHistory, getManagerTrips, rejectTripRequest,
  tripRequest
} = Trips;
const { doesTripExist, canManagerChangeTripStatus } = tripAuthenticator;
const { getManagerId } = managerHelper;
const router = express.Router();

router
  .post('/request', authenticate, validateRequestType, validate(onewayCheck(), 'one-way'),
    onewayValidateInput, validate(multicityCheck(), 'Multi-city'), multicityValidateInput, tripRequest)

  .put('/manager/request/:id',
    authenticate, permissionCheck, doesTripExist,
    getManagerId, canManagerChangeTripStatus, rejectTripRequest).get('/manager/request/:id', getManagerTrips)

  .get('/manager/request/:id', getManagerTrips)

  .get(
    '/request',
    authenticate, userRequestHistoryValidator, getUserRequestHistory
  );

export default router;
