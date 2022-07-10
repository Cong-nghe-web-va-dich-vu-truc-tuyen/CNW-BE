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
exports.ProductService = void 0;
const basicService_1 = require("./basicService");
class ProductService extends basicService_1.BasicService {
    createProduct(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productDB.createProduct(args);
        });
    }
    deleteProduct(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productDB.deleteProduct(args);
        });
    }
    updateProduct(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productDB.updateProduct(args);
        });
    }
    findProductById(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productDB.findProductById(args);
        });
    }
    findAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productDB.getAllProducts();
        });
    }
}
exports.ProductService = ProductService;
