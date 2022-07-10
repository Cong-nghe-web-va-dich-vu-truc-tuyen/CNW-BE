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
exports.UserDb = exports.UserModel = exports.userTable = void 0;
const mongoose_1 = require("mongoose");
const user_1 = require("./../../models/user");
exports.userTable = 'User';
const UserSchema = new mongoose_1.Schema({
    name: {
        type: 'string',
        required: true,
        trim: true
    },
    email: {
        type: 'string',
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
        trim: true
    },
    address: {
        type: 'string',
        trim: true
    },
    phoneNumber: {
        type: 'string',
        trim: true
    },
    role: {
        type: 'number',
        required: true,
        default: 0
    }
});
const UserModel = (0, mongoose_1.model)(exports.userTable, UserSchema);
exports.UserModel = UserModel;
class UserDb {
    findUserByEmail(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel.findOne({ email: args.email });
            return new user_1.UserInfor(user);
        });
    }
    createUser(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new UserModel(args);
            yield newUser.save();
            return new user_1.UserInfor(newUser);
        });
    }
    updateUser(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel.findOneAndUpdate({ email: args.email }, args.data, {
                new: true,
            });
            return new user_1.UserInfor(user);
        });
    }
    deleteUser(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new user_1.UserInfor(yield UserModel.findOneAndDelete({ email: args.email }));
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.find();
        });
    }
}
exports.UserDb = UserDb;
