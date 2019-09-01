import { Router } from 'express';
import ProfileController from '../../controllers/profileController';
import Authentication from '../../middlewares/auth';
import profileValidation from '../../validation/profilevalidation';

const profileRoute = Router();

profileRoute.get('/', Authentication.authenticate, profileValidation, ProfileController.getProfile);
profileRoute.put('/', Authentication.authenticate, profileValidation, ProfileController.updateProfile);

export default profileRoute;
