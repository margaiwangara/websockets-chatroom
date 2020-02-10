import { Router } from 'express';
import { userAuthorized } from '../middleware/auth';
import { userLoginGet, userLoginPost } from '../controller/auth';

const router = Router();

router.get('/login', userAuthorized, userLoginGet);

router.post('/login', userAuthorized, userLoginPost);

export default router;
