import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { appConfig } from "../config";
import { getUserByIdService } from "../services/auth.service";
import AppError from "../utils/appError";
import { IAuthenticatedRequest } from "../types/auth.types";

export const authGuard = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1] as string;
            if (!token) {
                return next(new AppError('Authorization header missing', 401));
            }
            const decodedUserId = jwt.verify(token, appConfig.jwtSecret as string) as string;
            const user = await getUserByIdService(decodedUserId);

            if (!user) {
                return next(new AppError('Invalid credentials', 401))
            }
            req.userId = user.userId;
            return next();
        }

        return next(new AppError('Authorization header missing', 401));

    } catch (err) {
        next(new AppError('Authorization header missing', 401));
    }

}