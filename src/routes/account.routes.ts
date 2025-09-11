import { Router } from 'express';
import { getUserAccount } from '../controllers/account.controller';
const router = Router();

router.get('/', getUserAccount);


export default router;