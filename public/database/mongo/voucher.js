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
exports.VoucherDb = exports.voucherModel = exports.voucherTable = void 0;
const mongoose_1 = require("mongoose");
const voucher_1 = require("../../models/voucher");
exports.voucherTable = "Voucher";
const voucherSchema = new mongoose_1.Schema({
    discount: {
        type: Number,
        default: 0
    },
    condition: {
        type: Number,
        default: 0
    }
});
exports.voucherModel = (0, mongoose_1.model)(exports.voucherTable, voucherSchema);
class VoucherDb {
    getAllVouchers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exports.voucherModel.find();
        });
    }
    getVoucherById(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const voucher = yield exports.voucherModel.findById(args.id);
            return new voucher_1.VoucherInfo(voucher);
        });
    }
    updateVoucherById(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const voucher = yield exports.voucherModel.findByIdAndUpdate(args.id, args.data, { new: true });
            return new voucher_1.VoucherInfo(voucher);
        });
    }
    deleteVoucherById(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const voucher = yield exports.voucherModel.findByIdAndDelete(args.id);
            return new voucher_1.VoucherInfo(voucher);
        });
    }
    createVoucher(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const voucher = yield exports.voucherModel.create(args.data);
            return new voucher_1.VoucherInfo(voucher);
        });
    }
}
exports.VoucherDb = VoucherDb;
