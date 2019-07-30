const postService = require('../services/post.service');
const userService = require('../services/user.service')
const notificationService = require('../services/notification.service');
/** Add post */
addPost = function (req, res) {
	console.log('req.body=================>', req.body);
	console.log('req.file====================>', req.file);
	const PostData = req.body;
	const file = req.file;
	postService.addPost(PostData, file).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}
/**Get All Posts */
getAllPost = function (req, res) {
	const { offset } = req.query;
	const _pageSize = 10;
	console.log("req.param", req.query.offset)
	postService.getAllPost(offset, _pageSize).then((response) => {
		return res.status(200).json({ status: response.status , message: response.message, data: response.data,totalCount:response.totalcount });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}
/**Get posts by user id */
getPostByUserId = function (req, res) {
	const { userId } = req.params;
	console.log('userid=================>', userId);
	postService.getPostByUserId(userId).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/**Upadate post by id */
updatePostById = function (req, res) {
	// const { postId } = req.params;
	const data = req.body
	// console.log('postid====================>', postId);
	console.log("req.body======================>", req.body);
	console.log('hashtags===================>', req.body.hashTag);
	postService.updatePostById(data).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/**Get Post By postId */
getPostBYPostId = function (req, res) {
	const { postId } = req.params;
	console.log("postIid===============>", postId)
	postService.getPostBYPostId(postId).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/** Delete poost */
deletePost = function (req, res) {
	console.log("postIddddddd==========================>", req.body)
	const { postId } = req.body.payload;
	postService.deletePost(postId).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/** get Friends Post */
getMyFriendsPost = function (req, res) {
	console.log("req.query in getfrndpost=========>", req.query)
	const { offset } = req.query;
	const _pageSize = 10;
	const { userId } = req.params;
	console.log("current User", userId);
	postService.getMyFriendsPost(userId, _pageSize, offset).then((response) => {
		return res.status(200).json({ status: response.status, message: response.message, data: response.data ,totalPageCount:response.totalPageCount});
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/** Like Post */
likePost = function (req, res) {
	const { postId, userId } = req.body;
	console.log('postId=================>', postId);
	console.log('userId=================>', userId);
	postService.likePost(userId, postId).then((response) => {
		console.log("response================>", response);
		if (response.data.userId != userId) {
			userService.getSingleUser(response.data.userId).then((res) => {
				console.log('res=============>', res.data);
				userService.getSingleUser(userId).then((userres) => {
					console.log('userres=============>', userres)
					if (response.data.isLiked === true && res.data.deviceToken) {
						const obj = {
							'to': res.data.deviceToken,
							'notification': {
								title: userres.data.userName,
								body: userres.data.userName + ' liked your post',
							},
							'data': {
								profilePhoto: userres.data.profilePhoto,
								userData:userres.data
							}
						}
						console.log('obj============>', obj)
						notificationService.sendNotification(obj);
					}
				})
			})
		}
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

searchPost = function (req, res) {
	console.log('req,body===================>', req.body);
	const { key } = req.body;
	console.log('search texttttttttttt================>', key);
	postService.searchPost(key).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

module.exports = {
	addPost: addPost,
	getAllPost: getAllPost,
	getPostByUserId: getPostByUserId,
	updatePostById: updatePostById,
	getPostBYPostId: getPostBYPostId,
	deletePost: deletePost,
	getMyFriendsPost: getMyFriendsPost,
	likePost: likePost,
	searchPost: searchPost
};