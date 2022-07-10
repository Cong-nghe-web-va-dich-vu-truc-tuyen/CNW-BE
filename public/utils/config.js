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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.DB_PWD = exports.DB_USER = exports.DB_PORT = exports.DB_HOST = exports.TOKEN_SECRET = exports.BCRYPT_SALT = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT || "") || 10;
exports.TOKEN_SECRET = process.env.TOKEN_SECRET || "";
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = process.env.DB_PORT;
exports.DB_USER = process.env.DB_USER;
exports.DB_PWD = process.env.DB_PWD;
exports.DB_NAME = process.env.DB_NAME;
