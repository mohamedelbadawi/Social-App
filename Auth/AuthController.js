const validator = require('validator');
const AuthValidation = require('./AuthValidation');
const UserService = require('../user/UserService');
const { json } = require('express');
const jwt = require('jsonwebtoken');
const argon = require('argon2');
class AuthController {

    static async register(req, res) {
        try {
            const data = req.body;
            if (await AuthValidation.registerValidation(data, res)) {
                data.password = await argon.hash(data.password);
                const user = await UserService.createUser(data);
                return res.json({ param: "success", msg: "User register successfully" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    static async generateToken(user) {
        const token = await jwt.sign(user, process.env.JWT_SECRET_KEY);
        return token;
    }
    static async login(req, res) {
        try {
            if (await AuthValidation.loginValidation(req.body, res)) {
                const data = req.body;
                const { email, password, id } = await UserService.findUserByEmail(req.body.email);
                if (email === data.email && await argon.verify(password, data.password)) {
                    const user = { email: email, id: id };
                    const token = await AuthController.generateToken(user);
                    return res.json({ access_token: token });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }



}
module.exports = AuthController;
