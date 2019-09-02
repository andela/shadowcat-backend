import express from 'express';
import requestController from '../../controllers/request';
import Auth from '../../middlewares/auth';
import requestValidator from '../../validation/requestValidate';

const requestRouter = express.Router();

requestRouter.post(
  '/requests',
  [Auth.authenticate, requestValidator],
  requestController.makeRequest
);
export default requestRouter;
