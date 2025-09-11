import bcrypt from 'bcryptjs';
import UserModel from "../models/userModel";
import AppError from "../utils/appError";
import { ILoginResponse, IRegisterUserResponse } from '../types/auth.types';
import jwt, { SignOptions } from 'jsonwebtoken';
import { appConfig } from '../config';

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

export const loginService = async (email: string, password: string): Promise<ILoginResponse> => {
    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) {
        throw new AppError('Email not found', 404);
    }

    const pswdMatch = await bcrypt.compare(password, user.password);

    if (!pswdMatch) {
        throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign({ id: user._id.toString() }, appConfig.jwtSecret as string, { expiresIn: appConfig.tokenExpiry } as SignOptions);

    return {
        token,
        email,
        userId: user._id.toString()
    }

}

export const getUserByIdService = async (userId: string): Promise<{ userId: string; role: string }> => {
    const user = await UserModel.findById(userId).select('_id role');
    if (!user) {
        throw new AppError('User not found', 404);
}
    return { userId: user._id.toString(), role: user.role }
}