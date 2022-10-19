const argon = require('argon2');
const userService = require('./UserService');
module.exports = class UserController {
    static async me(req, res) {
        return res.json({ email: req.data.email });
    }

    static async updateProfile(req, res) {
        if (req.user.id == req.params.id) {
            const data = req.body;
            if (req.body.password) {
                try {
                    const hashedPassword = await argon.hash(req.body.password);
                    data.body.password = hashedPassword;
                } catch (error) {
                    return res.json(error);
                }
            }
            if (req.file != undefined) {
                data.image = req.file.filename;
            }
            try {
                const user = await userService.updateUser(req.params.id, { $set: req.body });
                return res.json({ param: "success", msg: "Account updated successfully" });

            } catch (error) {
                return res.json(error);
            }
        }
        else {
            return res.status(403).json("You can update only your profile");
        }

    }

    static async followUser(req, res) {
        try {
            if (req.user.id != req.params.id) {
                const user = await userService.getUserById(req.params.id);
                const currentUser = await userService.getUserById(req.user.id);
                if (!user.followers.includes(currentUser.id)) {
                    await user.updateOne({ $push: { followers: currentUser.id } });
                    await currentUser.updateOne({ $push: { following: user.id } });
                    return res.json({ param: "success", msg: "Done" });
                }
                else {
                    await user.updateOne({ $pull: { followers: currentUser.id } });
                    await currentUser.updateOne({ $pull: { following: user.id } });
                    return res.json({ param: "success", msg: "Done" });
                }
            }
            else {
                return res.json({ param: "error", msg: `you can't follow yourself` });

            }
        } catch (error) {
            return res.json({ param: "error", msg: error });
        }
    }

}