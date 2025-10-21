import { Router } from 'express';
import { loginSchema, userRegisterSchema } from '../validationSchema/authValidation';
import { login, registerUser } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();

router.post('/register', validateRequest(userRegisterSchema), registerUser);
router.post('/login', validateRequest(loginSchema), login);

export default router;