import { Router } from 'express';
import { getUserAccount, updateUserAccount } from '../controllers/account.controller';
import validateRequest from '../middlewares/validateRequest';
import { updateAccountSchema } from '../validationSchema/authValidation';
import { uploadUserProfileImg } from '../middlewares/fileUploadHandler';
const router = Router();

router.get('/', getUserAccount);
router.put('/update', uploadUserProfileImg.single('file'), validateRequest(updateAccountSchema), updateUserAccount);


export default router;