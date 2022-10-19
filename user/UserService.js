const User = require('./UserSchema');
module.exports = class UserService {
    static async getAllUsers() {
        try {
            const allUsers = await User.find();
            return allUsers;
        } catch (error) {
            console.log(`can't fetch all users because of :${allUsers}`);
        }
    }

    static async getUserById(id) {
        try {
            const user = await User.findById(id);
            return user;
        } catch (error) {
            console.log(`can't get the user because of :${allUsers}`);
        }
    }

    static async createUser(data) {
        try {
            const newUser = {
                name: data.name,
                username: data.name,
                email: data.email,
                password: data.password
            };
            const response = await new User(newUser).save();
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async updateUser(id, data) {
        try {
            const updated = await User.findByIdAndUpdate(id, data);
            return updated;
        } catch (error) {
            console.log(error);
        }
    }

    static async findUserByEmail(email) {
        try {
            return await User.findOne({ email: email });
        } catch (error) {

        }
    }

    static async usernameCount(username) {
        try {
            return await User.countDocuments({ username: username });
        } catch (error) {
            console.log(error);
        }
    }
    static async emailCount(email) {
        try {
            return await User.countDocuments({ email: email });
        } catch (error) {
            console.log(error);
        }
    }
}