import express from 'express';
import notifyUserController from '../../controllers/notifyUser';

import authenticator from '../../middlewares/passwordResetMiddleware';


const notifyUserRouter = express.Router();

const { isLoggedIn } = authenticator;


const foo = (io = null) => {
  const notify = new notifyUserController(io);
  const { createNewTrip, getManagerTrips } = notify;
  // to get email
  // notifyUserRouter.get('/create_trips', notify.createNewTrip);
  notifyUserRouter.post('/create_trips', isLoggedIn, createNewTrip);
  notifyUserRouter.get('/get_trips/:id', getManagerTrips);
  // notifyUserRouter.get('/get_trips', notify.getManagerTrips);
  return notifyUserRouter;
};

export default foo;
