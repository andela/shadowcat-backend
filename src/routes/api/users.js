import { Router } from 'express';
import passport from 'passport';
import passportSetup from '../../config/passport'; // eslint-disable-line no-unused-vars
import SocialMediaLogin from '../../controllers/socialMediaLogin';

const { googleLogin, facebookLogin } = SocialMediaLogin;

const router = Router();

router.get(
  '/users/google/login',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
router.get(
  '/users/facebook/login',
  passport.authenticate('facebook')
);

router.get('/users/google/login/redirect', passport.authenticate('google'), googleLogin);
router.get('/users/facebook/login/redirect', passport.authenticate('facebook'), facebookLogin);


export default router;
