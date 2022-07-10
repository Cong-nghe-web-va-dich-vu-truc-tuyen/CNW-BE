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
exports.Router = void 0;
const getRoutes = [];
const postRoutes = [];
const utils_1 = require("../utils/utils");
const utils = new utils_1.Utils();
class Router {
    constructor() {
        this._registerRouter = (path, funct) => {
            let middlewares = [];
            let controller;
            const len = funct.length;
            if (len == 1) {
                middlewares = [];
                controller = funct[0];
            }
            if (len >= 2) {
                middlewares = funct.slice(0, len - 1);
                controller = funct[len - 1];
            }
            return {
                path: path,
                middlewares: middlewares,
                controller: controller,
            };
        };
        this.processRoute = (req, res, listRoutes) => __awaiter(this, void 0, void 0, function* () {
            for (let route of listRoutes) {
                if (req.url === route.path) {
                    if (route.middlewares.length === 1) {
                        route.middlewares[0](req, res, route.controller);
                    }
                    else if (route.middlewares.length === 0) {
                        route.controller(req, res);
                    }
                    break;
                }
            }
        });
        this.get = (path, ...funct) => {
            let route = this._registerRouter(path, funct);
            getRoutes.push(route);
        };
        this.post = (path, ...funct) => {
            let route = this._registerRouter(path, funct);
            postRoutes.push(route);
        };
        this.runRouter = (req, res) => {
            let method = req.method;
            let path = req.url;
            console.log(method, path);
            if (method === "GET") {
                this.processRoute(req, res, getRoutes);
            }
            else if (method === "POST") {
                this.processRoute(req, res, postRoutes);
            }
            else if (method === "OPTIONS") {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
                res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
                res.end();
            }
        };
    }
}
exports.Router = Router;
