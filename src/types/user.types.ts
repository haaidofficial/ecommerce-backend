export interface IAddress {
    street: string;
    city: string;
    zip: string;
    country: string;
    isDefault?: boolean;
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
    avatar: string;
}

export interface IAccountDTO {
    id: string;
    name: string;
    email:string;
    role: string;
    isVerified: Boolean;
    address: IAddress[];
    avatar: string;
}