import { NextFunction, Request, Response } from "express";
import { getUserAccountService, updateUserAccountService } from "../services/account.service";
import { IAuthenticatedRequest } from "../types/auth.types";
import { IAccountUpdate } from "../types/user.types";

export const getUserAccount = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId as string;
        const user = await getUserAccountService(userId);
        return res.status(200).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
}

export const updateUserAccount = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId as string;
        const payload: IAccountUpdate = req.body;
        const result = await updateUserAccountService(userId, payload);
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}