const validator = require('validator');
const UserService = require('../user/UserService');
module.exports = class AuthValidation {
    static async registerValidation(data, res) {

        if (Object.keys(data).length < 5) {
            return res.json({ param: 'error', msg: "all fields are required" });
        }

        const { name, email, username, password, password_confirmation } = data;
        const errors = [];
        if (validator.isEmpty(name)) {
            errors.push({ param: 'name', msg: 'Name is required' });
        }
        if (validator.isEmpty(username)) {
            errors.push({ param: 'username', msg: 'username is required' });
        }
        if (!validator.isEmail(email)) {
            errors.push({ param: 'email', msg: 'Invalid email' });
        }

        if (validator.isEmpty(password)) {
            errors.push({ param: 'password', msg: 'password is required' });
        }
        if (password != password_confirmation) {
            errors.push({
                param: 'password_confirmation',
                msg: `password don't match`
            });
        }
        const usernameExists = await UserService.usernameCount(username);
        const emailExists = await UserService.emailCount(email);

        if (usernameExists > 0) {
            errors.push({
                param: 'username',
                msg: 'Invalid username.'
            });
        }

        if (emailExists > 0) {
            errors.push({
                param: 'email',
                msg: 'Invalid e-mail address.'
            });
        }

        if (errors.length)
            res.json(errors);
        else
            return true;
    }

    static async loginValidation(data, res) {
        if (Object.keys(data).length < 2) {
            return res.json({ param: 'error', msg: "all fields are required" });
        }
        const errors = [];
        const { email, password } = data;
        if (await !validator.isEmail(email)) {
            errors.push({ param: 'email', msg: 'Invalid email' });
        }

        if (await validator.isEmpty(password)) {
            errors.push({ param: 'password', msg: 'password is required' });
        }

        if (errors.length)
            res.json(errors);
        else
            return true;

    }
}