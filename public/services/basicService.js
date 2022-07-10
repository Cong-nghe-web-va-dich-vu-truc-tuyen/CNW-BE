"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicService = void 0;
const comment_1 = require("../database/mongo/comment");
const order_1 = require("../database/mongo/order");
const product_1 = require("../database/mongo/product");
const user_1 = require("../database/mongo/user");
const voucher_1 = require("../database/mongo/voucher");
class BasicService {
    constructor() {
        this.userDB = new user_1.UserDb();
        this.productDB = new product_1.ProductDb();
        this.orderDB = new order_1.OrderDb();
        this.voucherDB = new voucher_1.VoucherDb();
        this.commentDB = new comment_1.CommentDb();
    }
}
exports.BasicService = BasicService;
