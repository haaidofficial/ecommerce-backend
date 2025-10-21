import { Types } from "mongoose";

export interface IAddress {
    street: string;
    city: string;
    zip: string;
    country: string;
    isDefault?: boolean;
    _id?: Types.ObjectId
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    isVerified: boolean;
    address: IAddress[];
    passwordChangedAt?: Date;
    resetPasswordToken?: string;
    profileImg: string;
}

export interface IAccountDTO {
    userId: string;
    name: string;
    email: string;
    role: string;
    isVerified: Boolean;
    address: IAddress[];
    profileImg: string;
}

export interface IAccountUpdate {
    name?: string;
    email?: string;
    profileImg?: string;
}