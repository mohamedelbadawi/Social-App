module.exports = class UserController {
    static async me(req, res) {
        return res.json({ email: req.data.email });
    }
}