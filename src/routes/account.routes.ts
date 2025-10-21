import { Router } from 'express';
import { addAddress, deleteAddress, getUserAccount, updateAddress, updateUserAccount } from '../controllers/account.controller';
import { validateRequest, validateRequestParams } from '../middlewares/validateRequest';
import { addressIdSchema, addressSchema, updateAccountSchema } from '../validationSchema/authValidation';
import { uploadUserProfileImg } from '../middlewares/fileUploadHandler';
const router = Router();

router.get('/', getUserAccount);
router.put('/update', uploadUserProfileImg.single('avatar'), validateRequest(updateAccountSchema), updateUserAccount);
router.post('/add-address', validateRequest(addressSchema), addAddress);
router.put('/update-address/:addressId', validateRequestParams(addressIdSchema), validateRequest(addressSchema), updateAddress);
router.delete('/delete-address/:addressId', validateRequestParams(addressIdSchema), deleteAddress);

export default router;