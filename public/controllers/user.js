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
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const config_1 = require("../utils/config");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const utils_2 = require("../utils/utils");
const utils = new utils_1.Utils();
const userService = new userService_1.UserService();
class UserController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    let user = yield userService.findUserByEmail({ email: body.email });
                    if (!user) {
                        user = yield userService.findUserByEmail({ email: body.email });
                    }
                    if (!user) {
                        return utils.responseUnauthor(res, 200, { message: "Email or Password not match", status: 0 });
                    }
                    if (!bcryptjs_1.default.compareSync(body.password, user.password)) {
                        return utils.responseUnauthor(res, 200, { message: "Email or Password not match", status: 0 });
                    }
                    const userFormatted = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        address: user.address,
                        phoneNumber: user.phoneNumber,
                        role: user.role
                    };
                    let accessToken = utils.generateAccessToken(userFormatted);
                    const loginResult = {
                        accessToken,
                        userFormatted
                    };
                    return utils.sendRespond(res, accessToken, 200, Object.assign(Object.assign({}, loginResult), { status: 1 }));
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    let emailExist = yield userService.findUserByEmail({ email: body.email });
                    if (emailExist._id !== undefined) {
                        res.setHeader("Content-Type", "application/json");
                        res.writeHead(404, utils_2.headers);
                        res.write(JSON.stringify({ message: "Email đã tồn tại trong hệ thống", status: 0 }));
                        res.end("\n");
                        return;
                    }
                    const password = bcryptjs_1.default.hashSync(body.password, bcryptjs_1.default.genSaltSync(config_1.BCRYPT_SALT));
                    const user = yield userService.createUser({
                        _id: undefined,
                        email: body.email,
                        password: password,
                        name: body.name,
                        address: body.address,
                        phoneNumber: body.phoneNumber,
                        role: user_1.Role.client
                    });
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(201, utils_2.headers);
                    res.write(JSON.stringify({ user, accessToken: utils.generateAccessToken({
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            address: (_a = user.address) !== null && _a !== void 0 ? _a : '',
                            phoneNumber: (_b = user.phoneNumber) !== null && _b !== void 0 ? _b : ' ',
                            role: user_1.Role.client
                        }), status: 1 }));
                    res.end("\n");
                }));
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
        this.createAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    let emailExist = yield userService.findUserByEmail({ email: body.email });
                    if (emailExist._id !== undefined) {
                        return yield utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Email đã tồn tại trong hệ thống" });
                    }
                    const password = bcryptjs_1.default.hashSync(body.password, bcryptjs_1.default.genSaltSync(config_1.BCRYPT_SALT));
                    const admin = yield userService.createUser({
                        _id: undefined,
                        email: body.email,
                        password: password,
                        name: body.name,
                        address: body.address,
                        phoneNumber: body.phoneNumber,
                        role: user_1.Role.admin
                    });
                    yield utils.sendRespond(res, utils.getAccessToken(req), 201, admin);
                }));
            }
            catch (error) {
                utils.sendRespond(res, utils.getAccessToken(req), 400, { error: error });
            }
        });
        this.updateProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    let currentUser = yield utils.requestUser(req);
                    let email = currentUser.email;
                    let user = yield userService.updateUser({ email: email, data: body });
                    let userToken = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        address: user.address,
                        phoneNumber: user.phoneNumber,
                        role: user.role
                    };
                    if (user._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Đã xảy ra lỗi" });
                    }
                    utils.sendRespond(res, utils.generateAccessToken(userToken), 201, user);
                }));
            }
            catch (error) {
                utils.sendRespond(res, utils.getAccessToken(req), 400, { error: error });
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    const result = yield userService.deleteUser({ email: body.email });
                    if (result.email === body.email) {
                        yield utils.sendRespond(res, utils.getAccessToken(req), 200, { message: "Đã xóa thành công", account: result });
                    }
                    else
                        yield utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Đã xảy ra lỗi" });
                }));
            }
            catch (error) {
                utils.sendRespond(res, utils.getAccessToken(req), 400, { error: error });
            }
        });
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let token = (0, jwt_decode_1.default)(utils.getAccessToken(req));
                const users = yield userService.getAllUsers();
                utils.sendRespond(res, utils.getAccessToken(req), 200, users);
            }
            catch (error) {
                utils.sendRespond(res, utils.getAccessToken(req), 400, { error: error });
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    let user = yield userService.findUserByEmail({ email: body.email });
                    if (user.email === "") {
                        let error = { message: "Not found", status: 404 };
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, error);
                    }
                    utils.sendRespond(res, utils.getAccessToken(req), 200, user);
                }));
            }
            catch (error) {
                utils.sendRespond(res, utils.getAccessToken(req), 400, { error: error });
            }
        });
        this.changePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = "";
                req.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
                    data += chunk.toString();
                    const body = JSON.parse(data);
                    let currentUser = yield utils.requestUser(req);
                    let email = currentUser.email;
                    const password = bcryptjs_1.default.hashSync(body.password, bcryptjs_1.default.genSaltSync(config_1.BCRYPT_SALT));
                    let user = yield userService.updateUser({ email: email, data: { password: password } });
                    let userToken = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        address: user.address,
                        phoneNumber: user.phoneNumber,
                        role: user.role
                    };
                    if (user._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Đã xảy ra lỗi" });
                    }
                    utils.sendRespond(res, utils.generateAccessToken(userToken), 201, user);
                }));
            }
            catch (error) {
                utils.sendRespond(res, utils.getAccessToken(req), 400, { error: error });
            }
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            utils.responseUnauthor(res, 200, { message: "Đăng xuất thành công" });
        });
        this.checkLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers['authorization'].split(" ")[1];
                const body = (0, jwt_decode_1.default)(token);
                utils.sendRespond(res, utils.getAccessToken(req), 200, { currentUser: body.currentUser });
            }
            catch (error) {
                utils.responseUnauthor(res, 400, { error: error });
            }
        });
    }
}
exports.UserController = UserController;
