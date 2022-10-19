const postService = require('./PostService');
const validator = require('validator');
const { json } = require('express');
const userService = require('../user/UserService');

module.exports = class PostController {

    static async addPost(req, res) {
        try {
            if (Object.keys(req.body).length < 1 || validator.isEmpty(req.body.description)) {
                return res.json("you must provide all data");
            }
            const postData = {
                description: req.body.description,
                user: req.user.id,

            };
            if (req.file != undefined) {
                postData.image = req.file.filename;
            }
            const post = await postService.createPost(postData);

            return res.json({ param: "Success", msg: "Post created successfully" });
        } catch (error) {
            console.log(error);
        }
    }

    static async updatePost(req, res) {
        try {
            if (await postService.getPostById(req.params.id).user == req.user.id) {
                const data = req.body;
                await postService.updatePost(req.params.id, data);
                return res.json({ param: "success", msg: "post updated successfully" });
            }
            return res.json({ param: "error", msg: `you can't update post ` });

        } catch (error) {
            return res.json({ param: "error", msg: error }, 400);
        }
    }
    static async deletePost(req, res) {
        try {
            if (await postService.getPostById(req.params.id).user == req.user.id) {

                await postService.deletePost(req.params.id);
                return res.json({ param: "success", msg: "post deleted successfully" });
            }
            return res.json({ param: "error", msg: `you can't delete post ` });

        } catch (error) {
            return res.json({ param: "error", msg: error }, 400);
        }
    }

    static async likePost(req, res) {
        try {

            const post = await postService.getPostById(req.params.id);
            if (!post.likes.includes(req.user.id)) {
                await post.updateOne({ $push: { likes: req.user.id } });
                return res.json({ param: "success", msg: "the post has been liked successfully" });
            }
            else {
                await post.updateOne({ $pull: { likes: req.user.id } });
                return res.json({ param: "success", msg: "the post has been disliked successfully" });
            }
        } catch (error) {
            return res.json({ param: "error", msg: error });

        }
    }

    static async getPost(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            return res.json(post);
        } catch (error) {
            return res.json({ param: "error", msg: error });
        }
    }
    static async getTimeline(req, res) {
        try {
            const userPosts = await postService.getPostsByUserId(req.user.id);
            const user = await userService.getUserById(req.user.id);
            const followingPosts = await Promise.all(
                user.following.map((followingId) => {
                    postService.getPostsByUserId(followingId);
                })
            );
            res.json(userPosts.concat(...followingPosts));
        } catch (error) {

        }
    }

}

