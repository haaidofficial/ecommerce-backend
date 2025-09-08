import { Router } from 'express';
import validateRequest from '../middlewares/validateRequest';
import { userRegisterSchema } from '../validationSchema/authValidation'; 

const router = Router();

router.post('/register', validateRequest(userRegisterSchema), (req, res) => {});

export default router;