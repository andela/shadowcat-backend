import { Router } from 'express';
import ProfileController from '../../controllers/profileController';
import Authentication from '../../middlewares/auth';
import profileValidation from '../../validation/profilevalidation';

const profileRoute = Router();

profileRoute.get('/', profileValidation, Authentication.authenticate, ProfileController.getProfile);
profileRoute.put('/',profileValidation, Authentication.authenticate, ProfileController.updateProfile);

export default profileRoute;
