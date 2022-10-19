const Post = require('./PostSchema');
module.exports = class PostService {
    static async getAllPosts() {
        try {
            const posts = Post.find();
            return posts;
        } catch (error) {
            console.log(error);
        }
    }

    static async createPost(data) {
        try {
            const post = {
                description: data.description,
                image: data.image,
                user: data.user,
            };
            const response = await new Post(post).save();
        } catch (error) {
            console.log(error);
        }
    }

    static async getPostById(id) {
        try {
            return await Post.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    static async updatePost(id, data) {
        try {

            return await Post.findByIdAndUpdate(id, data);
        } catch (error) {
            console.log(error);
        }
    }

    static async deletePost(id) {
        try {
            return await Post.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }

    static async getPostsByUserId(id) {
        try {
            return await Post.find({ user: id });
        } catch (error) {
            console.log(error);
        }
    }
}