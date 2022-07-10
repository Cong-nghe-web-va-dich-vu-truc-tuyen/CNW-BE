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
exports.VoucherService = void 0;
const basicService_1 = require("./basicService");
class VoucherService extends basicService_1.BasicService {
    getAllVouchers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.voucherDB.getAllVouchers();
        });
    }
    getVoucherById(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.voucherDB.getVoucherById(args);
        });
    }
    updateVoucherById(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.voucherDB.updateVoucherById(args);
        });
    }
    deleteVoucherById(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.voucherDB.deleteVoucherById(args);
        });
    }
    createVoucher(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.voucherDB.createVoucher(args);
        });
    }
}
exports.VoucherService = VoucherService;
