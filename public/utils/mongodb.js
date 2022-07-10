"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const user_1 = require("../database/mongo/user");
const DB_URL = `mongodb://${config_1.DB_HOST}:${config_1.DB_PORT}`;
const userDB = new user_1.UserDb();
const connectDatabase = (callback) => {
    mongoose_1.default
        .connect(DB_URL, {
        auth: {
            password: config_1.DB_PWD,
            username: config_1.DB_USER,
        },
        dbName: config_1.DB_NAME,
        authSource: config_1.DB_NAME
    })
        .then(() => {
        console.log("Connect database successfully!");
        if (callback)
            callback();
    })
        .catch((err) => console.error("MongoDB initial connection error: ", err));
    mongoose_1.default.connection.on("error", (err) => {
        console.log("MongoDB error: ", err);
    });
};
exports.default = connectDatabase;
