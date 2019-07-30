const express = require('express');
const router = express.Router();
const hashTagController = require('./../controller/hashTag.controller');
const postValidation = require('./../validation/postValidation');
const withAuth = require('../middleware/withAuth');

router.use([withAuth]);
router.route('/hashtag')
    .post([postValidation.addHashTag], hashTagController.addTag)
    .get( hashTagController.getTag);

module.exports = router;