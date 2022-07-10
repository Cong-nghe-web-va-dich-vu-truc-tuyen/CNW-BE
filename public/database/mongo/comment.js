"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentDb = exports.commentModel = exports.commentTableName = void 0;
const mongoose_1 = require("mongoose");
const comment_1 = require("../../models/comment");
const user_1 = require("./user");
exports.commentTableName = "Comment";
const schema = new mongoose_1.Schema({
    content: {
        type: 'string',
        required: true
    },
    owner: {
        type: mongoose_1.Types.ObjectId,
        ref: user_1.userTable
    },
    productId: {
        type: 'string',
        required: true
    },
    type: {
        type: 'number',
        required: true,
        default: 0
    },
    parentId: {
        type: 'string',
    },
    amountReply: {
        type: 'number',
        default: 0
    }
}, {
    timestamps: true
});
exports.commentModel = (0, mongoose_1.model)(exports.commentTableName, schema);
class CommentDb {
    getAllComments(agrs) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exports.commentModel.find({ productId: agrs.productId, type: comment_1.TypeComment.feedback }).populate('owner').exec();
        });
    }
    getAllReplyByCommentIds(agrs) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exports.commentModel.find({ parentId: agrs.parentId, type: comment_1.TypeComment.reply });
        });
    }
    createComment(agrs) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = new exports.commentModel(agrs);
            yield comment.save();
            return new comment_1.CommentInfor(comment);
        });
    }
    updateComment(agrs) {
        return __awaiter(this, void 0, void 0, function* () {
            //    const comment = await commentModel.findByIdAndUpdate(agrs._id, agrs.data, {new: true})
            return new comment_1.CommentInfor(yield exports.commentModel.findByIdAndUpdate(agrs._id, agrs.data, { new: true }));
        });
    }
    deleteComment(agrs) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield exports.commentModel.findByIdAndDelete(agrs._id);
            return new comment_1.CommentInfor(comment);
        });
    }
    deleteReply(agrs) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exports.commentModel.deleteMany({ parentId: agrs.parentId });
        });
    }
}
exports.CommentDb = CommentDb;
