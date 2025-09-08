import bcrypt from 'bcryptjs';
import UserModel from "../models/userModel";
import AppError from "../utils/appError";
import { IRegisterUserResponse } from '../types/auth.types';

export const registerUserService = async (name: string, email: string, password: string): Promise<IRegisterUserResponse> => {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw new AppError('User with this email already exists', 400);
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({ name, email, password: hashedPassword });

    return {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email
    }
}