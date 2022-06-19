import http from "http"
import jwt from "jsonwebtoken"
import { UserService } from "../services/userService"
import { Utils } from "../utils/utils"
import bcrypt from "bcryptjs"
import { Role } from "../models/user"
import { UserDb } from "../database/mongo/user"

const utils = new Utils()
const userService = new UserService()
// const userDB = new UserDb()
const BCRYPT_SALT = 10

export class UserController {

    login = async (req, res) => {
        try {
            const body: { email, password } = await utils.getPostData(req);
            let user = await userService.findUserByEmail({ email: body.email })
            console.log(user)
            if (!user) {
                user = await userService.findUserByEmail({ email: body.email })
            }

            if (!user) {
                let err: any = new Error("Email or Password not match");
                err.status = 404;
                throw err;
            }

            if (!bcrypt.compareSync(body.password, user.password)) {
                let err: any = new Error("Username/Email or Password not match");
                err.status = 400;
                throw err;
            }

            const userFormatted = {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                phoneNumber: user.phoneNumber,
                role: user.role
            }

            let acessToken = utils.generateAccessToken(userFormatted)
            const loginResult = {
                acessToken,
                userFormatted
            }
            utils.sendRespond(res, acessToken, 200, loginResult)

        } catch (error) {
            throw error
        }
    };

    createUser = async (req, res) => {
        try {

            const body: { name, email, password, address, phoneNumber } = await utils.getPostData(req);
            let emailExist = await userService.findUserByEmail({ email: body.email })

            if (emailExist._id !== undefined) {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(404)
                res.write(JSON.stringify({message: "Email đã tồn tại trong hệ thống"}))
                res.end("\n")
                return 
            }

            const password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(BCRYPT_SALT))

            const user = await userService.createUser({
                _id: undefined,
                email: body.email,
                password: password,
                name: body.name,
                address: body.address,
                phoneNumber: body.phoneNumber,
                role: 0
            })

            res.setHeader("Content-Type", "application/json");
            res.writeHead(200)
            res.write(JSON.stringify(user))
            res.end("\n")
        } catch (error) {
            res.end("Error")
            throw error
        }
    };

    createAdmin = async (req, res) => {
        try {

            const body: { name, email, password, address, phoneNumber, role } = await utils.getPostData(req);
            let emailExist = await userService.findUserByEmail({ email: body.email })

            if (emailExist._id !== undefined) {
                return await utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Email đã tồn tại trong hệ thống" })
            }

            const password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(BCRYPT_SALT))

            const admin = await userService.createUser({
                _id: undefined,
                email: body.email,
                password: password,
                name: body.name,
                address: body.address,
                phoneNumber: body.phoneNumber,
                role: 1
            })

            await utils.sendRespond(res, utils.getAccessToken(req), 200, admin)

        } catch (error) {
            throw error
        }
    };

    updateProfile = async (req, res) => {
        try {
            const data: { name, address, phoneNumber } = await utils.getPostData(req)
            let currentUser = await utils.requestUser(req)
            console.log(currentUser)
            let email = currentUser.email

            let user = await userService.updateUser({ email: email, data: data })
            console.log(user)


        } catch (error) {
            console.log(error)
        }
    };

    deleteUser = async (req, res) => {
        try {

            const body: { email } = await utils.getPostData(req);
            const result = await userService.deleteUser({ email: body.email });
            if (result.email === body.email) {
                await utils.sendRespond(res, utils.getAccessToken(req), 200, { message: "Đã xóa thành công", account: result })
            } else await utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Đã xảy ra lỗi" })

        } catch (error) {
            console.log(error)
        }
    };

    getAllUsers = async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            utils.sendRespond(res, utils.getAccessToken(req), 200, users)
        } catch (error) {
            console.log(error)
        }
    };

    getUser = async (req, res) => {
        try {
            const body: { email } = await utils.getPostData(req);
            let user = await userService.findUserByEmail({ email: body.email })
            if (user.email === "") {
                let error = { message: "Not found", status: 404 }
                return utils.sendRespond(res, utils.getAccessToken(req), 404, error)
            }
            utils.sendRespond(res, utils.getAccessToken(req), 200, user)
        } catch (error) {
            console.log(error)
        }

    };


}



