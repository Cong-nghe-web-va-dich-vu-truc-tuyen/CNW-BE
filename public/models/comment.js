"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentInfor = exports.TypeComment = void 0;
const user_1 = require("./user");
var TypeComment;
(function (TypeComment) {
    TypeComment[TypeComment["feedback"] = 0] = "feedback";
    TypeComment[TypeComment["reply"] = 1] = "reply";
})(TypeComment = exports.TypeComment || (exports.TypeComment = {}));
class CommentInfor {
    constructor(args) {
        var _a, _b, _c, _d, _e, _f, _g;
        this._id = (_a = args === null || args === void 0 ? void 0 : args._id) !== null && _a !== void 0 ? _a : undefined;
        this.content = (_b = args === null || args === void 0 ? void 0 : args.content) !== null && _b !== void 0 ? _b : "";
        this.owner = (_c = args === null || args === void 0 ? void 0 : args.owner) !== null && _c !== void 0 ? _c : new user_1.UserInfor();
        this.productId = (_d = args === null || args === void 0 ? void 0 : args.productId) !== null && _d !== void 0 ? _d : "";
        this.type = (_e = args === null || args === void 0 ? void 0 : args.type) !== null && _e !== void 0 ? _e : TypeComment.feedback;
        this.parentId = (_f = args === null || args === void 0 ? void 0 : args.parentId) !== null && _f !== void 0 ? _f : "";
        this.amountReply = (_g = args === null || args === void 0 ? void 0 : args.amountReply) !== null && _g !== void 0 ? _g : 0;
    }
}
exports.CommentInfor = CommentInfor;
