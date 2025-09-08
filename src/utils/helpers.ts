import { Response } from "express";

export const sendSuccess = (res: Response, data: any, statusCode = 200, status = true, message = 'success') => {
    return res.status(statusCode).json({ success: status, message, data });
}