import { Router } from 'express';

import Logout from '../../controllers/logout';

const router = Router();
const { logout } = Logout;

router.post('/v1/auth/logout', logout);

export default router;
