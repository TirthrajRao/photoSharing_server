const express = require('express');
const router = express.Router();
const messageController = require('./../controller/message.controller');
const withAuth = require('../middleware/withAuth');
const postValidation = require('./../validation/postValidation');

router.use([withAuth]);
router.post('/sharepost',[postValidation.sharePost], messageController.sharedPost);
router.get('/get-shared-post/:curruntUserId', messageController.getShardPost);
router.get('/get-shared-post-by-id/:id',  messageController.getPostsById);

module.exports = router;