import UserModel from "../models/userModel"
import { IAccountDTO } from "../types/user.types"
import AppError from "../utils/appError";

export const getUserAccountService = async (userId: string): Promise<IAccountDTO> => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new AppError('User not found', 404);
    }

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.name,
        role: user.role,
        isVerified: user.isVerified,
        address: user.address,
        avatar: user.avatar
    }
}