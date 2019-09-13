import express from 'express';
import { Trips } from '../../controllers';
import { Authentication, RoleStatus, tripAuthenticator } from '../../middlewares';
import managerHelper from '../../utils/helpManager/managerHelper';
import { multicityCheck, validateInput, userRequestHistoryValidator } from '../../validation';

const { authenticate } = Authentication;
const { getPermission } = RoleStatus;
const permissionCheck = getPermission('rejectRequest');
const {
  multiCityRequest, getUserRequestHistory, getManagerTrips, rejectTripRequest
} = Trips;
const { doesTripExist, canManagerChangeTripStatus } = tripAuthenticator;
const { getManagerId } = managerHelper;
const router = express.Router();

router.post('/request', authenticate, multicityCheck, validateInput, multiCityRequest);
router.get('/manager/request/:id', getManagerTrips);
router.put('/manager/request/:id', authenticate, permissionCheck, doesTripExist, getManagerId, canManagerChangeTripStatus, rejectTripRequest);

router.get(
  '/request',
  authenticate, userRequestHistoryValidator, getUserRequestHistory
);

export default router;
