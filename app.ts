
import http from "http";
import connectDatabase from "./utils/mongodb";
import { Router} from "./superRoutes/Router";
import routerUser from "./superRoutes/routesUser"
import routerProduct from "./superRoutes/routesProduct"
import routerOrder from "./superRoutes/routesOrder"
import routerVoucher from "./superRoutes/routesVoucher"
import { Required } from "./middlewares/userRequired";

import * as dotenv from 'dotenv';
dotenv.config();
routerUser; routerOrder; routerProduct;  routerVoucher

const router = new Router()
const required = new Required()
const port = process.env.PORT ;

const pathUnthorize = [
    '/login', 
    '/register', 
    '/product/list', 
    '/product/detail',
    '/voucher/list',
    '/voucher/detail'
]

const server = http.createServer(async (req, res) => {

    req.on("data", () => {})
    if (pathUnthorize.find((path) => { return path === req.url})) {
        router.runRouter(req, res)
    }
    else {
        required.authenticate(req, res, router.runRouter)
    }

})

connectDatabase();

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})




