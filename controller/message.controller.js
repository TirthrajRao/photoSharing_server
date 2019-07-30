const messageService = require('../services/message.service');
const userService = require('../services/user.service');
const notificationService = require('../services/notification.service');

/** Post shared */
sharedPost = function (req, res) {
	console.log('===========req.body========================', req.body);
	const postData = {
		postId: req.body.postId,
		desId: req.body.desId,
		srcId: req.body.srcId
	}
	messageService.sharedPost(postData).then((response) => {
		console.log('response=================>', response.data.srcId, response.data.desId);
		if (req.body.srcId != req.body.desId) {
			userService.getSingleUser(response.data.srcId).then((srcres) => {
				console.log('srcres================>', srcres);
				userService.getSingleUser(response.data.desId).then((desres) => {
					if (desres.data.deviceToken) {
						const obj = {
							'to': desres.data.deviceToken,
							'notification': {
								title: srcres.data.userName,
								body: srcres.data.userName + ' Shared post with you',
							},
							'data': {
								profilePhoto: srcres.data.profilePhoto,
								userData:srcres.data
							}
						}
						console.log('obj============>', obj)
						notificationService.sendNotification(obj);
					}
				})
			})
			return res.status(200).json({ status: 1, message: response.message, data: response.data });
		}
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/** get user whose Shared post */
getShardPost = function (req, res) {
	const { curruntUserId } = req.params;
	messageService.getShardPost(curruntUserId).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/**Get Shared Posts */
getPostsById = function (req, res) {
	console.log("===================", req.params.id)
	const { id } = req.params;
	messageService.getPostsById(id).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

module.exports = {
	sharedPost: sharedPost,
	getShardPost: getShardPost,
	getPostsById: getPostsById
};