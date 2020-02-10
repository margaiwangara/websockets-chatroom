import { Router } from 'express';
import { userAuthorized, loginAuthorized } from '../middleware/auth';
import { userLoginGet, userLoginPost, userLogout } from '../controller/auth';

const router = Router();

router.get('/login', userAuthorized, userLoginGet);

router.post('/login', userAuthorized, userLoginPost);

router.post('/logout', loginAuthorized, userLogout);

export default router;
