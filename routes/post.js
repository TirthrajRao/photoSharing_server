const express = require('express');
const router = express.Router();
const postController = require('./../controller/post.controller');
const postValidation = require('./../validation/postValidation');
const fileUpload = require('../middleware/fileUpload');
const withAuth = require('../middleware/withAuth');

router.use([withAuth]);
/* GET users listing. */
router.route('/post')
    .post([fileUpload.upload('images'), postValidation.addPost], postController.addPost)
    .get(postController.getAllPost)
    .put([postValidation.updatePost], postController.updatePostById)
    .delete([postValidation.deletePost], postController.deletePost)

router.post('/like', [postValidation.likePost], postController.likePost);
router.post('/search', [postValidation.searchPost], postController.searchPost);
router.get('/get-post-by-id/:userId', postController.getPostByUserId);
router.get('/get-my-friends-post/:userId', postController.getMyFriendsPost);
router.get('/get-post-by-post-id/:postId', postController.getPostBYPostId);

module.exports = router;
