import express from 'express';
import requestController from '../../controllers/request';
import Auth from '../../middlewares/auth';
import requestValidator from '../../validation/one-way.validation';

const requestRouter = express.Router();

requestRouter.post(
  '/requests',
  [Auth.authenticate, requestValidator],
  requestController.oneWay
);
export default requestRouter;
