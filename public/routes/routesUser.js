"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
const Router_1 = require("./Router");
const userRequired_1 = require("../middlewares/userRequired");
const router = new Router_1.Router();
const controllers = new user_1.UserController();
const required = new userRequired_1.Required();
router.get('/user/list', required.adminRequired, controllers.getAllUsers);
router.post('/user/create-admin', required.adminRequired, controllers.createAdmin);
router.post('/user/detail', required.adminRequired, controllers.getUser);
router.post('/user/delete', required.adminRequired, controllers.deleteUser);
router.post('/user/update-profile', controllers.updateProfile);
router.post('/login', controllers.login);
router.post('/register', controllers.createUser);
router.post('/user/change-password', controllers.changePassword);
router.get('/user/logout', controllers.logout);
router.post('/user/checkLogin', controllers.checkLogin);
exports.default = router;
