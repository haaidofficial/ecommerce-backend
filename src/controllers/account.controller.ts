import { NextFunction, Request, Response } from "express";
import { getUserAccountService } from "../services/account.service";
import { IAuthenticatedRequest } from "../types/auth.types";

export const getUserAccount = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.userId;
        const user = await getUserAccountService(userId);
        return res.status(200).json({ success: true, user});
    } catch (err) {
        next(err);
    }
}