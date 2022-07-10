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
exports.Utils = exports.headers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const config_1 = require("./config");
exports.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Max-Age": 30 * 60 * 60 * 24, // 30 days
    /** add other headers as per requirement */
};
class Utils {
    constructor() {
        this.generateAccessToken = (currentUser) => {
            // expires after 7 days = 7 * 60 * 60 * 24
            return jsonwebtoken_1.default.sign({ currentUser }, config_1.TOKEN_SECRET, { expiresIn: 7 * 60 * 60 * 24 });
        };
        this.sendRespond = (res, accessToken, statusCode, data) => {
            res.setHeader("Authorization", `Bearer ${accessToken}`);
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statusCode, exports.headers);
            res.write(JSON.stringify(data));
            res.end("\n");
        };
        this.responseUnauthor = (res, statusCode, data) => {
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statusCode, exports.headers);
            res.write(JSON.stringify(data));
            res.end("\n");
        };
        this.requestUser = (req) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers['authorization'].split(" ")[1];
            let data = (0, jwt_decode_1.default)(token);
            return data.currentUser;
        });
        this.getAccessToken = (req) => {
            return req.headers['authorization'].split(" ")[1];
        };
    }
}
exports.Utils = Utils;
