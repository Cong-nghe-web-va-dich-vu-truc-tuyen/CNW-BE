"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherInfo = void 0;
class VoucherInfo {
    constructor(args) {
        var _a, _b, _c;
        this._id = (_a = args === null || args === void 0 ? void 0 : args._id) !== null && _a !== void 0 ? _a : undefined;
        this.discount = (_b = args === null || args === void 0 ? void 0 : args.discount) !== null && _b !== void 0 ? _b : 0;
        this.condition = (_c = args === null || args === void 0 ? void 0 : args.condition) !== null && _c !== void 0 ? _c : 0;
    }
}
exports.VoucherInfo = VoucherInfo;
