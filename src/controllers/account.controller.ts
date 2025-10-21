import { NextFunction, Request, Response } from "express";
import { addAddressService, deleteAddressService, getUserAccountService, updateAddressService, updateUserAccountService } from "../services/account.service";
import { IAuthenticatedRequest, IUserUpdaterRequest } from "../types/auth.types";
import { IAccountUpdate, IAddress } from "../types/user.types";
import { normalizeFilePath } from "../utils/helpers";

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
        if (req.file) {
            payload.profileImg = normalizeFilePath(req.file.path);
        }
        const result = await updateUserAccountService(userId, payload);
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

export const addAddress = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId as string;
        const payload: IAddress = req.body;
        const result = await addAddressService(userId, payload);
        return res.status(200).json({ success: true, message: 'New address added successfully', data: result.address });
    } catch (err) {
        next(err);
    }
}

export const updateAddress = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId as string;
        const addressId = req.params.addressId as string;
        const payload: IAddress = req.body;
        const result = await updateAddressService(userId, payload, addressId);
        return res.status(200).json({ success: true, message: 'Address updated successfully', data: result.address });
    } catch (err) {
        next(err);
    }
}


export const deleteAddress = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId as string;
        const addressId = req.params.addressId as string;
        const result = await deleteAddressService(userId, addressId);
        res.status(200).json({ success: true, message: 'Address deleted successfully', data: result.address });
    } catch (err) {
        next(err);
    }
}