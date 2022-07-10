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
exports.ProductController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productService_1 = require("../services/productService");
const utils_1 = require("../utils/utils");
const productService = new productService_1.ProductService();
const utils = new utils_1.Utils();
class ProductController {
    constructor() {
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    const product = yield productService.createProduct({
                        name: body.name,
                        price: body.price,
                        color: body.color,
                        size: body.size,
                        linkImg: body.linkImg
                    });
                    if (product._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không thể tạo mới sản phẩm" });
                    }
                    return utils.sendRespond(res, utils.getAccessToken(req), 201, product);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.helloApi = (req, res) => {
            return utils.responseUnauthor(res, 200, { message: 'hello' });
        };
        this.getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService.findAllProducts();
                return utils.responseUnauthor(res, 200, products);
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    if (!mongoose_1.default.isValidObjectId(body._id)) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phẩm" });
                    }
                    if (body._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Not found" });
                    }
                    const product = yield productService.updateProduct({ _id: body._id, data: body.data });
                    if (product._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phẩm" });
                    }
                    return utils.sendRespond(res, utils.getAccessToken(req), 201, product);
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.getProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    const checkLogin = req.headers['authorization'];
                    if (!mongoose_1.default.isValidObjectId(body._id)) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phẩm" });
                    }
                    let product = yield productService.findProductById({ _id: body._id });
                    if (product._id === undefined) {
                        product = yield productService.findProductById({ _id: body._id });
                    }
                    if (checkLogin === undefined) {
                        if (product._id === undefined) {
                            return utils.responseUnauthor(res, 404, { message: "Không tìm thấy sản phầm" });
                        }
                        return utils.responseUnauthor(res, 200, product);
                    }
                    else {
                        if (product._id === undefined) {
                            return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phầm" });
                        }
                        return utils.sendRespond(res, utils.getAccessToken(req), 200, product);
                    }
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    if (!mongoose_1.default.isValidObjectId(body._id)) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phẩm" });
                    }
                    const productDeleted = yield productService.deleteProduct({ _id: body._id });
                    if (productDeleted._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phẩm" });
                    }
                    return utils.sendRespond(res, utils.getAccessToken(req), 200, { message: "Xóa thành công", product: productDeleted });
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
    }
}
exports.ProductController = ProductController;
