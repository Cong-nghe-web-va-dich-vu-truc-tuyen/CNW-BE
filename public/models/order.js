"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderInfo = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["pending"] = 0] = "pending";
    OrderStatus[OrderStatus["cancelled"] = 1] = "cancelled";
    OrderStatus[OrderStatus["success"] = 2] = "success";
    OrderStatus[OrderStatus["delivering"] = 3] = "delivering";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
class OrderInfo {
    constructor(arg) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        this._id = (_a = arg === null || arg === void 0 ? void 0 : arg._id) !== null && _a !== void 0 ? _a : undefined;
        this.products = (_b = arg === null || arg === void 0 ? void 0 : arg.products) !== null && _b !== void 0 ? _b : [];
        this.totalPrice = (_c = arg === null || arg === void 0 ? void 0 : arg.totalPrice) !== null && _c !== void 0 ? _c : 0;
        this.userId = (_d = arg === null || arg === void 0 ? void 0 : arg.userId) !== null && _d !== void 0 ? _d : undefined;
        this.address = (_e = arg === null || arg === void 0 ? void 0 : arg.address) !== null && _e !== void 0 ? _e : "";
        this.phoneNumber = (_f = arg === null || arg === void 0 ? void 0 : arg.phoneNumber) !== null && _f !== void 0 ? _f : "";
        this.status = (_g = arg === null || arg === void 0 ? void 0 : arg.status) !== null && _g !== void 0 ? _g : OrderStatus.pending;
        this.createdAt = (_h = arg === null || arg === void 0 ? void 0 : arg.createdAt) !== null && _h !== void 0 ? _h : "";
        this.updatedAt = (_j = arg === null || arg === void 0 ? void 0 : arg.updatedAt) !== null && _j !== void 0 ? _j : "";
        this.size = (_k = arg === null || arg === void 0 ? void 0 : arg.size) !== null && _k !== void 0 ? _k : [];
        this.amount = (_l = arg === null || arg === void 0 ? void 0 : arg.amount) !== null && _l !== void 0 ? _l : [];
    }
}
exports.OrderInfo = OrderInfo;
