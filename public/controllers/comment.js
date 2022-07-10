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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const commentService_1 = require("../services/commentService");
const utils_1 = require("../utils/utils");
const mongoose_1 = __importDefault(require("mongoose"));
const utils = new utils_1.Utils();
const commentService = new commentService_1.CommentService();
class CommentController {
    constructor() {
        this.getAllComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    if (!mongoose_1.default.isValidObjectId(body.productId)) {
                        return utils.responseUnauthor(res, 404, { message: "Sản phẩm không tồn tại" });
                    }
                    const comments = yield commentService.getAllComments({ productId: body.productId });
                    return utils.responseUnauthor(res, 200, comments);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.createComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    const newComment = yield commentService.createComment(body);
                    if (newComment._id === undefined) {
                        utils.responseUnauthor(res, 400, { message: "Bình luận không thành công" });
                    }
                    return utils.responseUnauthor(res, 200, newComment);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.updateComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    if (!mongoose_1.default.isValidObjectId(body.id)) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Bình luận này không tồn tại" });
                    }
                    const commentEdited = yield commentService.updateComment({ _id: body.id, data: body.data });
                    if (commentEdited._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không thể sửa bình luận" });
                    }
                    return utils.sendRespond(res, utils.getAccessToken(req), 201, commentEdited);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.deleteComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    if (!mongoose_1.default.isValidObjectId(body.id)) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Bình luận này không tồn tại" });
                    }
                    if (body.type === 1) {
                        const commentDeleted = yield commentService.deleteComment({ _id: body.id });
                        if (commentDeleted._id === undefined) {
                            return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Xóa bình luận không thành công. Vui lòng thử  lại" });
                        }
                        return utils.sendRespond(res, utils.getAccessToken(req), 200, commentDeleted);
                    }
                    else if (body.type === 0) {
                        const feedbackDeleted = yield commentService.deleteComment({ _id: body.id });
                        const replyDeleted = yield commentService.deleteReply({ parentId: body.id });
                        return utils.sendRespond(res, utils.getAccessToken(req), 200, feedbackDeleted);
                    }
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.getAllReplyComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    const checkLogin = req.headers['authorization'];
                    const commentsReply = yield commentService.getAllReplyByCommentIds({ parentId: body.parentId });
                    if (checkLogin === undefined) {
                        return utils.responseUnauthor(res, 200, commentsReply);
                    }
                    return utils.sendRespond(res, utils.getAccessToken(req), 200, commentsReply);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
    }
}
exports.CommentController = CommentController;
