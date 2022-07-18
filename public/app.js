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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const mongodb_1 = __importDefault(require("./utils/mongodb"));
const Router_1 = require("./routes/Router");
const routesUser_1 = __importDefault(require("./routes/routesUser"));
const routesProduct_1 = __importDefault(require("./routes/routesProduct"));
const routesOrder_1 = __importDefault(require("./routes/routesOrder"));
const routesVoucher_1 = __importDefault(require("./routes/routesVoucher"));
const routesComment_1 = __importDefault(require("./routes/routesComment"));
const userRequired_1 = require("./middlewares/userRequired");
const utils_1 = require("./utils/utils");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
routesUser_1.default;
routesOrder_1.default;
routesProduct_1.default;
routesVoucher_1.default;
routesComment_1.default;
const router = new Router_1.Router();
const required = new userRequired_1.Required();
const port = process.env.PORT;
const utils = new utils_1.Utils();
const pathUnthorize = [
    '/login',
    '/register',
    '/product/list',
    '/product/detail',
    '/voucher/list',
    '/voucher/detail',
    '/comments',
    '/comment/reply',
    '/comment/post'
];
const server = http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (pathUnthorize.find((path) => { return path === req.url; })) {
        router.runRouter(req, res);
    }
    else {
        required.authenticate(req, res, router.runRouter);
    }
}));
(0, mongodb_1.default)();
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
