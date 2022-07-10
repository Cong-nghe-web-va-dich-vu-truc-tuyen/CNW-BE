import { IUserDb } from './../interface/user.interface';
import { Model } from 'mongoose';
import { IUser } from './../../models/user';
export declare const userTable = "User";
export interface IUserDocument extends IUser, Document {
    _id: any;
}
declare const UserModel: Model<IUserDocument, {}, {}, {}>;
export { UserModel };
export declare class UserDb implements IUserDb {
    findUserByEmail(args: {
        email: string;
    }): Promise<IUser>;
    createUser(args: {
        email: string;
        password: string;
        name: any;
        role: number;
    }): Promise<IUser>;
    updateUser(args: {
        email: string;
        data: any;
    }): Promise<IUser>;
    deleteUser(args: {
        email: string;
    }): Promise<IUser>;
    getAllUsers(): Promise<IUser[]>;
}
