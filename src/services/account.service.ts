import { Types } from "mongoose";
import UserModel from "../models/userModel"
import { IAccountDTO, IAccountUpdate, IAddress } from "../types/user.types"
import AppError from "../utils/appError";

export const getUserAccountService = async (userId: string): Promise<IAccountDTO> => {
    const user = await UserModel.findById(userId).select('_id name email role isVerified address avatar');

    if (!user) {
        throw new AppError('User not found', 404);
    }

    return {
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        address: user.address,
        profileImg: user.profileImg
    }
}

export const updateUserAccountService = async (userId: string, updatedData: IAccountUpdate): Promise<Partial<IAccountDTO>> => {
    const user = await UserModel.findByIdAndUpdate(userId, { $set: updatedData }, { new: true, select: "-password -resetPasswordToken" });
    if (!user) {
        throw new AppError('Unable to update', 400)
    }
    return {
        userId,
        name: user?.name,
        email: user?.email,
        address: user?.address,
        profileImg: user?.profileImg,
        isVerified: user?.isVerified,
    }
}

export const addAddressService = async (userId: string, address: IAddress): Promise<Partial<IAccountDTO>> => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    if (address.isDefault) {
        user.address.forEach(addr => addr.isDefault = false);
    }

    user.address.push(address);
    await user.save();

    return {
        userId,
        address: user.address
    }
}


export const updateAddressService = async (userId: string, address: IAddress, addressId: string): Promise<Partial<IAccountDTO>> => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    const addressIndex = user.address.findIndex(addr => addr._id?.toString() === addressId);

    if (addressIndex === -1) {
        throw new AppError('Address not found', 404);
    }

    user.address[addressIndex] = {
        ...user.address[addressIndex],
        ...address
    };

    await user.save();

    return {
        userId,
        address: user.address
    }
}

export const deleteAddressService = async (userId: string, addressId: string): Promise<Partial<IAccountDTO>> => {
    const user = await UserModel.findById(userId)

    if (!user) {
        throw new AppError('User not found', 404);
    }

    const updateAddress = user.address.filter(addr => addr._id?.toString() !== addressId);
    user.address = updateAddress;

    await user.save();

    return {
        userId,
        address: user.address
    }
}