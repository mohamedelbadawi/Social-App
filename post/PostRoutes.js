const router = require('express').Router();
const { ensureToken, verifyToken } = require('../Auth/AuthMiddleware');
const upload = require('../scripts/upload');
const PostController = require('./PostController');

router.post('/add-post', upload.single('image'), ensureToken, verifyToken, PostController.addPost);
router.post('/update-post/:id', ensureToken, verifyToken, PostController.updatePost);
router.post('/delete-post/:id', ensureToken, verifyToken, PostController.deletePost);
router.post('/like/:id', ensureToken, verifyToken, PostController.likePost);
router.post('/posts/:id', ensureToken, verifyToken, PostController.getPost);
router.post('/timeline', ensureToken, verifyToken, PostController.getTimeline);
module.exports = router;