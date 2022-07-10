import { IUser } from "./user";
export interface IComment {
    _id?: string | undefined;
    content: string;
    owner: IUser;
    productId: string;
    type: TypeComment;
    parentId?: string;
    amountReply: number;
}
export declare enum TypeComment {
    feedback = 0,
    reply = 1
}
export declare class CommentInfor {
    _id?: string | undefined;
    content: string;
    owner: IUser;
    productId: string;
    type: TypeComment;
    parentId?: string;
    amountReply: number;
    constructor(args?: any);
}
