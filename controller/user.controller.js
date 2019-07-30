const userService = require('../services/user.service');
const notificationService = require('../services/notification.service');

/** Register User */
addUser = function (req, res) {
	console.log('============adduser=============', req.body)
	const userData = {
		name: req.body.name,
		userName: req.body.userName,
		email: req.body.email,
		password: req.body.password
	}
	userService.addUser(userData).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/** get user by id */
getSingleUser = function (req, res, next) {
	console.log("req.paras ===>", req.params.userId);
	const { userId } = req.params;
	userService.getSingleUser(userId).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/** update user */
updateUser = function (req, res) {
	console.log("===============userId===============", req.params.userId, req.params.userName);
	console.log("---------------------------", req.body, req.file)
	const userData = {
		userId: req.body.userId,
		userName: req.body.userName,
		profilePhoto: req.body.profilePhoto,
	}
	if (req.file) {
		userData.fileName = req.file.filename;
		userData.file = req.file;
	}

	userService.updateUser(userData).then((response) => {
		return res.status(200).json({ status: response.status, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}


/** getFriends by userId */
getMyAllFriendsById = function (req, res) {
	const currentUser = req.params.userId;
	console.log("userId================>", req.params, currentUser)
	const { userId } = req.params;
	console.log("id", currentUser);
	userService.getMyAllFriendsById(userId).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/** get Followers by id */
getMyFollowersById = function (req, res) {
	const { userId } = req.params;
	userService.getMyFollowersById(userId).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/** LOGIN USER */
login = function (req, res) {
	console.log("============login==============", req.body);
	const userData = {
		userName: req.body.userName,
		password: req.body.password,
		deviceToken: req.body.deviceToken
	}
	userService.login(userData).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data, token: response.token });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/**GET ALL USER */
getAllUser = function (req, res) {
	userService.getAllUser().then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/** DELETE USER BY ID */
deleteUserById = function (req, res) {
	const { userId } = req.params;
	userService.deleteUserById(userId).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}
/** check user is present or not if it's not present then create new user */
checkAvailability = function (req, res) {
	console.log('req=========================>', req.body);
	console.log('req.id========>', req.body.id);
	const userData = {
		id: req.body.id,
		facebookId: req.body.facebookId,
		token: req.body.token,
		name: req.body.name
	}
	userService.checkAvailability(userId).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/**Search user */
searchUser = function (req, res) {
	console.log('req,body===================>', req.body);
	let { key } = req.body;
	console.log('search text================>', key);
	userService.searchUser(key).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

/** FOLLOW  USER */
addFriend = function (req, res) {
	const { requestedUser, userTobeFollowed } = req.body
	userService.addFriend(requestedUser, userTobeFollowed).then((response) => {
		console.log('response==============>', response.data);
		userService.getSingleUser(userTobeFollowed).then((res) => {
			console.log('response==============>', res.data);
			if (res.data.deviceToken) {
				const obj = {
					'to': res.data.deviceToken,
					'notification': {
						title: response.data.userName,
						body: response.data.userName + ' following you',
					},
					'data': {
						profilePhoto: response.data.profilePhoto,
						userData:response.data
					}
				}
				console.log('obj============>', obj)
				notificationService.sendNotification(obj);
			}
		})
			.catch((err) => {
				return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
			})
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

// UNFOLLOW USER
removeFriend = function (req, res) {
	const { requestedUser, userTobeUnFollowed } = req.body
	userService.removeFriend(requestedUser, userTobeUnFollowed).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}
/**Log Out*/
logOut = function (req, res) {
	console.log("=========>", req.params)
	const { userId } = req.params
	userService.logOut(userId).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

module.exports = {
	addUser: addUser,
	getSingleUser: getSingleUser,
	updateUser: updateUser,
	getMyAllFriendsById: getMyAllFriendsById,
	getMyFollowersById: getMyFollowersById,
	login: login,
	getAllUser: getAllUser,
	deleteUserById: deleteUserById,
	checkAvailability: checkAvailability,
	searchUser: searchUser,
	addFriend: addFriend,
	removeFriend: removeFriend,
	logOut: logOut
};