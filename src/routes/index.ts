import { Router } from 'express';
import authRoutes from './auth.routes';
import accountRoutes from './account.routes';
import adminRoutes from './admin.routes';
import { authAdmin, authGuard } from '../middlewares/protectedRoutes';
const router = Router();

router.use('/auth', authRoutes);
router.use('/account', authGuard, accountRoutes);
router.use('/admin', authGuard, authAdmin, adminRoutes);

export default router;