import { Schema, Document, model } from 'mongoose';
import { IAddress, IUser } from '../types/user.types';

const addressSchema = new Schema<IAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false }
})

const userSchema = new Schema<IUser>({
    name: { type: String, required: true, minLength: 3 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minLength: 8, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    address: { type: [addressSchema], default: [] },
    passwordChangedAt: { type: Date },
    resetPasswordToken: { type: String, select: false },
    avatar: { type: String }
});

const UserModel = model<IUser>('User', userSchema);
export default UserModel;