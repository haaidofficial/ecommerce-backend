import { Request } from "express";

export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
}

export interface IRegisterUserResponse {
    id: string;
    name: string;
    email: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    email?: string;
    userId?: string;
}

export interface IAuthenticatedRequest extends Request {
    userId?: string;
}

export interface ITokenEncodedInfo {
    userId: string;
}