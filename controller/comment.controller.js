const commentService = require('../services/comment.service');
const userService = require('../services/user.service');
const postService = require('../services/post.service');
const notificationService = require('../services/notification.service')
addComment = function (req, res) {
	console.log("req.body============>", req.body);
	const commentData = {
		comment: req.body.comment,
		userId: req.body.userId,
		postId: req.body.postId
	}
	commentService.addComment(commentData).then((response) => {
		// console.log('response============>', response);
		userService.getSingleUser(response.data.userId).then((userres) => {
			// console.log("userres============>", userres.data._id);
			postService.getPostBYPostId(response.data.postId).then((postres) => {
				console.log('postres=============>', postres.data[0].userId._id, userres.data._id);
				if (postres.data[0].userId._id != req.body.userId) {
					if (postres.data[0].userId.deviceToken) {
						const obj = {
							'to': postres.data[0].userId.deviceToken,
							'notification': {
								title: userres.data.userName,
								body: userres.data.userName + ' Commented on your post',
							},
							'data': {
								profilePhoto: userres.data.profilePhoto,
								userData: userres.data
							}
						}
						console.log('obj============>', obj)
						notificationService.sendNotification(obj);
					}
				}
				return res.status(200).json({ status: 1, message: response.message, data: response.data });
			})

		})
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

module.exports = {
	addComment: addComment,
};