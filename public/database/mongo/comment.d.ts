import { Model } from "mongoose";
import { IComment } from "../../models/comment";
import { ICommentDb } from "../interface/comment.interface";
export interface ICommentDocument extends IComment, Document {
    _id: any;
}
export declare const commentTableName = "Comment";
export declare const commentModel: Model<ICommentDocument, {}, {}, {}>;
export declare class CommentDb implements ICommentDb {
    getAllComments(agrs: {
        productId: string;
    }): Promise<IComment[]>;
    getAllReplyByCommentIds(agrs: {
        parentId: string;
    }): Promise<IComment[]>;
    createComment(agrs: IComment): Promise<IComment>;
    updateComment(agrs: {
        _id: string;
        data: any;
    }): Promise<IComment>;
    deleteComment(agrs: {
        _id: string;
    }): Promise<IComment>;
    deleteReply(agrs: {
        parentId: string;
    }): Promise<import("mongodb").DeleteResult>;
}
