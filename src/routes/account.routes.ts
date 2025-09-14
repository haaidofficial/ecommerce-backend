import { Router } from 'express';
import { getUserAccount, updateUserAccount } from '../controllers/account.controller';
import validateRequest from '../middlewares/validateRequest';
import { updateAccountSchema } from '../validationSchema/authValidation';
const router = Router();

router.get('/', getUserAccount);
router.put('/update', validateRequest(updateAccountSchema), updateUserAccount);


export default router;