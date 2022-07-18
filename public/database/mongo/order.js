"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.OrderDb = exports.orderModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const order_1 = require("../../models/order");
const product_1 = require("./product");
const user_1 = require("./user");
const orderTable = "Order";
const orderSchema = new mongoose_1.Schema({
    products: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: product_1.productTable
        }],
    totalPrice: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: user_1.userTable
    },
    address: String,
    phoneNumber: String,
    status: Number,
    size: [Number],
    amount: [Number],
}, {
    timestamps: true,
});
exports.orderModel = (0, mongoose_1.model)(orderTable, orderSchema);
class OrderDb {
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exports.orderModel.find().populate('userId').populate('products').exec();
        });
    }
    getOrderById(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield exports.orderModel.findById(args.id);
            return new order_1.OrderInfo(order);
        });
    }
    getOrderByIdUser(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exports.orderModel.find({ userId: args.id }).populate('userId').populate('products').exec();
        });
    }
    getOrderByStatus(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exports.orderModel.find({ status: args.status });
        });
    }
    updateOrder(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new order_1.OrderInfo(yield exports.orderModel.findByIdAndUpdate(args.id, args.data, { new: true }));
        });
    }
    createOrder(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const infoUser = {
                address: args.data.address,
                phoneNumber: args.data.phoneNumber
            };
            yield user_1.UserModel.findByIdAndUpdate(args.data.userId, Object.assign({}, infoUser));
            return new order_1.OrderInfo(yield exports.orderModel.create(args.data));
        });
    }
}
exports.OrderDb = OrderDb;
