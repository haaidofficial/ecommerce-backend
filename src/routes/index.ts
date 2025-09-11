import { Router } from 'express';
import authRoutes from './auth.routes';
import accountRoutes from './account.routes';
import { authGuard } from '../middlewares/protectedRoutes';
const router = Router();

router.use('/auth', authRoutes);
router.use('/account', authGuard, accountRoutes);

export default router;