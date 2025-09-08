import { Router } from 'express';
import validateRequest from '../middlewares/validateRequest';
import { userRegisterSchema } from '../validationSchema/authValidation';
import { registerUser } from '../controllers/auth.controller';

const router = Router();

router.post('/register', validateRequest(userRegisterSchema), registerUser);

export default router;