import { Router } from 'express';
import ProfileController from '../../controllers/profileController';

const profileRoute = Router();

profileRoute.get('/v1/profiles/:id', ProfileController.getProfile);
profileRoute.put('/v1/profiles/:id', ProfileController.updateProfile);

export default profileRoute;
