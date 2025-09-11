import { NextFunction, Request, Response } from 'express';
import { loginService, registerUserService } from '../services/auth.service';
import { ILogin, IRegisterUser } from '../types/auth.types';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: IRegisterUser = req.body;
        const result = await registerUserService(payload.name, payload.email, payload.password);
        return res.status(200).json({ success: true, message: 'User created successfully', data: result });
    } catch (err) {
        next(err)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const payload: ILogin = req.body;
    try {
        const result = await loginService(payload.email, payload.password);
        return res.status(200).json({ success: true, message: 'User logged in successfully', data: result });
    } catch (err) {
        next(err)
    }
}
