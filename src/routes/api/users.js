import { Router } from 'express';
import passport from 'passport';
import passportSetup from '../../config/passport'; // eslint-disable-line no-unused-vars
import SocialMediaLogin from '../../controllers/socialMediaLogin';

const { googleLogin, facebookLogin } = SocialMediaLogin;

const router = Router();

router.get(
  '/v1/auth/google/login',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
router.get(
  '/v1/auth/facebook/login',
  passport.authenticate('facebook', { scope: 'email' })
);

router.get('/v1/auth/google/login/redirect', passport.authenticate('google'), googleLogin);
router.get('/v1/auth/facebook/login/redirect', passport.authenticate('facebook'), facebookLogin);


export default router;
