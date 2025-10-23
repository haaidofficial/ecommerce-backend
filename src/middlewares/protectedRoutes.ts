import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { appConfig } from "../config";
import { getUserByIdService } from "../services/auth.service";
import AppError from "../utils/appError";
import { IAuthenticatedRequest, ITokenEncodedInfo } from "../types/auth.types";

export const authGuard = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            const token = authHeader.split(' ')[1] as string;
            if (!token) {
                return next(new AppError('Authorization header missing', 401));
            }
            const decoded = jwt.verify(token, appConfig.jwtSecret as string) as ITokenEncodedInfo;
            const user = await getUserByIdService(decoded.userId);

            if (!user) {
                return next(new AppError('Invalid credentials', 401))
            }
            req.userId = user.userId;
            req.role = user.role;

            return next();
        }

        return next(new AppError('Authorization header missing', 401));

    } catch (err) {
        next(new AppError('Authorization header missing', 401));
    }

}

export const authAdmin = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.role !== 'admin') {
        return next(new AppError('Access denied. Admin privileges required.', 403));
    }
    next();
}