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
exports.OrderController = void 0;
const utils_1 = require("../utils/utils");
const orderService_1 = require("../services/orderService");
const mongoose_1 = __importDefault(require("mongoose"));
const order_1 = require("../models/order");
const utils = new utils_1.Utils();
const orderService = new orderService_1.OrderService();
class OrderController {
    constructor() {
        this.getAllOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orderService.getAllOrders();
                utils.sendRespond(res, utils.getAccessToken(req), 200, orders);
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.getOrderByIdUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    const orders = yield orderService.getOrderByIdUser({ id: body.id });
                    utils.sendRespond(res, utils.getAccessToken(req), 200, orders);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.getOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    if (!mongoose_1.default.isValidObjectId(body.id)) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, {
                            message: "Không tìm thấy đơn hàng",
                        });
                    }
                    let order = yield orderService.getOrderById({ id: body.id });
                    if (order._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, {
                            message: "Không tìm thấy đơn hàng",
                        });
                    }
                    return utils.sendRespond(res, utils.getAccessToken(req), 200, order);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.getOrderbyStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    if (order_1.OrderStatus[body.status] === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, {
                            message: "Trạng thái không hợp lệ",
                        });
                    }
                    const orders = yield orderService.getOrderByStatus({
                        status: body.status,
                    });
                    return utils.sendRespond(res, utils.getAccessToken(req), 200, orders);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    const currentUser = yield utils.requestUser(req);
                    let order = Object.assign(Object.assign({}, body), { _id: undefined, userId: currentUser.id, name: currentUser.name });
                    let orderCreated = yield orderService.createOrder({ data: order });
                    if (orderCreated._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 400, {
                            message: "Tạo đơn hàng không thành công",
                        });
                    }
                    return utils.sendRespond(res, utils.getAccessToken(req), 201, orderCreated);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.updateOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    const orderUpdated = yield orderService.updateOrder({
                        id: body._id,
                        data: body.data,
                    });
                    if (orderUpdated._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 400, {
                            message: "Cập nhật thất bại",
                        });
                    }
                    return utils.sendRespond(res, utils.getAccessToken(req), 201, orderUpdated);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
    }
}
exports.OrderController = OrderController;
