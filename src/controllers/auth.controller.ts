import { NextFunction, Request, Response } from 'express';
import { registerUserService } from '../services/auth.service';
import { IRegisterUser } from '../types/auth.types';
import { sendSuccess } from '../utils/helpers';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: IRegisterUser = req.body;
        const result = await registerUserService(payload.name, payload.email, payload.password);
        return sendSuccess(res, result);
    } catch (err) {
        next(err)
    }
}