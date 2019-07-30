const express = require('express');
const router = express.Router();
const commentValidation = require('./../validation/commentValidation');
const commentController = require('./../controller/comment.controller');
const withAuth = require('../middleware/withAuth');

router.use([withAuth]);
router.post('/comment', [commentValidation.addComment], commentController.addComment);

module.exports = router;
