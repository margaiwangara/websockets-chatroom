import { Router } from 'express';
import { loginAuthorized } from '../middleware/auth';
import { homePage } from '../controller/app';

const router: Router = Router();

router.get('/', loginAuthorized, homePage);

export default router;
