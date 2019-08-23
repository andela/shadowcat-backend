import { Router } from 'express';

import Logout from '../../controllers/Logout';

const router = Router();
const { logout } = Logout;

router.get('/v1/auth/logout', logout);

export default router;
