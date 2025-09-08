import bcrypt from 'bcryptjs';
import UserModel, { IUser } from "../models/userModel";
import AppError from "../utils/appError";

const registerUser = async (name: string, email: string, password: string) => {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw new AppError('User with this email already exists', 400);
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = bcrypt.hash(password, salt);
    const newUser = await UserModel.create({ name, email, password: hashedPassword });

    return {
        id: newUser._id,
        
    }
}