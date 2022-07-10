"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInfor = void 0;
class ProductInfor {
    constructor(args) {
        var _a, _b, _c, _d, _e, _f;
        this._id = (_a = args === null || args === void 0 ? void 0 : args._id) !== null && _a !== void 0 ? _a : undefined;
        this.name = (_b = args === null || args === void 0 ? void 0 : args.name) !== null && _b !== void 0 ? _b : "";
        this.color = (_c = args === null || args === void 0 ? void 0 : args.color) !== null && _c !== void 0 ? _c : "";
        this.size = (_d = args === null || args === void 0 ? void 0 : args.size) !== null && _d !== void 0 ? _d : [];
        this.price = (_e = args === null || args === void 0 ? void 0 : args.price) !== null && _e !== void 0 ? _e : 0;
        this.linkImg = (_f = args === null || args === void 0 ? void 0 : args.linkImg) !== null && _f !== void 0 ? _f : [];
    }
}
exports.ProductInfor = ProductInfor;
