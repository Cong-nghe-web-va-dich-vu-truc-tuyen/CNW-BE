import { ObjectId } from "mongoose";
export interface IUser {
    _id?: ObjectId | undefined;
    email: string;
    password: string;
    name: string;
    address?: string;
    phoneNumber?: string;
    role: Role;
}
export declare enum Role {
    client = 0,
    admin = 1
}
export declare class UserInfor {
    _id?: ObjectId | undefined;
    email: string;
    password: string;
    name: string;
    address?: string;
    phoneNumber?: string;
    role: Role;
    constructor(args?: any);
}
