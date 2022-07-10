import { ObjectId } from "mongoose";
import { Role } from "../models/user";
export declare const headers: {
    "Access-Control-Allow-Origin": string;
    "Access-Control-Allow-Methods": string;
    "Access-Control-Max-Age": number;
};
export declare class Utils {
    generateAccessToken: (currentUser: {
        id: ObjectId | undefined;
        name: string;
        email: string;
        address: string | undefined;
        phoneNumber: string | undefined;
        role: Role;
    }) => string;
    sendRespond: (res: any, accessToken: any, statusCode: any, data: any) => void;
    responseUnauthor: (res: any, statusCode: any, data: any) => void;
    requestUser: (req: any) => Promise<any>;
    getAccessToken: (req: any) => any;
}
