import { IComment } from "../models/comment";
import { BasicService } from "./basicService";
export declare class CommentService extends BasicService {
    getAllComments(args: {
        productId: string;
    }): Promise<IComment[]>;
    getAllReplyByCommentIds(args: {
        parentId: string;
    }): Promise<IComment[]>;
    createComment(args: any): Promise<IComment>;
    updateComment(args: {
        _id: string;
        data: any;
    }): Promise<IComment>;
    deleteComment(args: {
        _id: string;
    }): Promise<IComment>;
    deleteReply(args: {
        parentId: string;
    }): Promise<any>;
}
