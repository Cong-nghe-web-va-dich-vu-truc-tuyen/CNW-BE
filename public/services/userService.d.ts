import { IUser } from "../models/user";
import { BasicService } from "./basicService";
export declare class UserService extends BasicService {
    getAllUsers(): Promise<IUser[]>;
    findUserByEmail(args: {
        email: string;
    }): Promise<IUser>;
    updateUser(args: {
        email: string;
        data: any;
    }): Promise<IUser>;
    deleteUser(args: {
        email: string;
    }): Promise<IUser>;
    createUser(args: IUser): Promise<IUser>;
}
