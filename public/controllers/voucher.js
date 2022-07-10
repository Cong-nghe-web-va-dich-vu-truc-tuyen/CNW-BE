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
exports.VoucherController = void 0;
const utils_1 = require("../utils/utils");
const voucherService_1 = require("../services/voucherService");
const mongoose_1 = __importDefault(require("mongoose"));
const utils = new utils_1.Utils();
const voucherService = new voucherService_1.VoucherService();
class VoucherController {
    constructor() {
        this.getAllVouchers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checkLogin = req.headers['authorization'];
                const vouchers = yield voucherService.getAllVouchers();
                if (checkLogin === undefined) {
                    return utils.responseUnauthor(res, 200, vouchers);
                }
                else
                    return utils.sendRespond(res, utils.getAccessToken(req), 200, vouchers);
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.getVoucher = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    const checkLogin = req.headers['authorization'];
                    if (!mongoose_1.default.isValidObjectId(body.id)) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy voucher" });
                    }
                    let voucher = yield voucherService.getVoucherById({ id: body.id });
                    if (voucher._id === undefined) {
                        voucher = yield voucherService.getVoucherById({ id: body.id });
                    }
                    if (checkLogin === undefined) {
                        if (voucher._id === undefined) {
                            return utils.responseUnauthor(res, 404, { message: "Không tìm thấy voucher" });
                        }
                        return utils.responseUnauthor(res, 200, voucher);
                    }
                    else {
                        if (voucher._id === undefined) {
                            return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy voucher" });
                        }
                        return utils.sendRespond(res, utils.getAccessToken(req), 200, voucher);
                    }
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.createVoucher = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    let voucher = {
                        _id: undefined,
                        discount: body.discount,
                        condition: body.condition
                    };
                    const voucherCreated = yield voucherService.createVoucher({ data: voucher });
                    if (voucherCreated._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 400, { message: "Tạo voucher không thành công" });
                    }
                    return utils.sendRespond(res, utils.getAccessToken(req), 200, voucherCreated);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.deleteVoucher = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    let voucherDeleted = yield voucherService.deleteVoucherById({ id: body.id });
                    if (voucherDeleted._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy voucher" });
                    }
                    return utils.sendRespond(res, utils.getAccessToken(req), 200, voucherDeleted);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.updateVoucher = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += JSON.parse(data);
                    const body = JSON.parse(data);
                    const voucherUpdated = yield voucherService.updateVoucherById({ id: body.id, data: body.data });
                    if (voucherUpdated._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Cập nhật voucher không thành công" });
                    }
                    return utils.sendRespond(res, utils.getAccessToken(req), 200, voucherUpdated);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
    }
}
exports.VoucherController = VoucherController;
