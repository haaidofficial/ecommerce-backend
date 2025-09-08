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