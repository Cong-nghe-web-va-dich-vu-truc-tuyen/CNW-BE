"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfor = exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["client"] = 0] = "client";
    Role[Role["admin"] = 1] = "admin";
})(Role = exports.Role || (exports.Role = {}));
class UserInfor {
    constructor(args) {
        var _a, _b, _c, _d, _e, _f, _g;
        this._id = (_a = args === null || args === void 0 ? void 0 : args._id) !== null && _a !== void 0 ? _a : undefined;
        this.email = (_b = args === null || args === void 0 ? void 0 : args.email) !== null && _b !== void 0 ? _b : "";
        this.password = (_c = args === null || args === void 0 ? void 0 : args.password) !== null && _c !== void 0 ? _c : "";
        this.address = (_d = args === null || args === void 0 ? void 0 : args.address) !== null && _d !== void 0 ? _d : "";
        this.phoneNumber = (_e = args === null || args === void 0 ? void 0 : args.phoneNumber) !== null && _e !== void 0 ? _e : "";
        this.role = (_f = args === null || args === void 0 ? void 0 : args.role) !== null && _f !== void 0 ? _f : 0;
        this.name = (_g = args === null || args === void 0 ? void 0 : args.name) !== null && _g !== void 0 ? _g : "";
    }
}
exports.UserInfor = UserInfor;
