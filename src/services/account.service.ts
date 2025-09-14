import UserModel from "../models/userModel"
import { IAccountDTO, IAccountUpdate } from "../types/user.types"
import AppError from "../utils/appError";

export const getUserAccountService = async (userId: string): Promise<IAccountDTO> => {
    const user = await UserModel.findById(userId).select('_id name email role isVerified address avatar');

    if (!user) {
        throw new AppError('User not found', 404);
    }

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        address: user.address,
        avatar: user.avatar
    }
}

export const updateUserAccountService = async (userId: string, updatedData: IAccountUpdate): Promise<Partial<IAccountDTO>> => {
    const user = await UserModel.findByIdAndUpdate(userId, { $set: updatedData }, { new: true, select: "-password -resetPasswordToken" });
    if (!user) {
        throw new AppError('Unable to update', 400)
    }
    return {
        id: userId,
        name: user?.name,
        email: user?.email,
        address: user?.address,
        avatar: user?.avatar,
        isVerified: user?.isVerified,
    }
}