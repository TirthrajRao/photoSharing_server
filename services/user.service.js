const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const ObjectId = require('mongodb').ObjectId;
/**
*@param {object} userData
* Register user Service
*/
module.exports.addUser = (userData) => {
    return new Promise((resolve, reject) => {
        User.findOne({ userName: userData.userName })
            .exec((err, foundUser) => {
                if (err) {
                    reject({ status: 500, message: 'Internal Serevr Error' });
                } else if (foundUser) {
                    console.log(foundUser)
                    reject({ status: 401, message: 'user is already exist' });
                } else {
                    User.create(userData,
                        function (err, user) {
                            if (err) {
                                console.log('errrrrrr=======>', err)
                                reject({ status: 500, message: ' There was a problem registering the user' });
                            } else {
                                console.log('user======================>', user)
                                resolve({ status: 200, message: 'registration sucessfully', data: user });
                            }
                        });
                }
            })
    })
}


/**
*@param {String} userId
*Get User By Id Service
*/
module.exports.getSingleUser = (userId) => {
    return new Promise((resolve, reject) => {
        User.aggregate([
            {
                $match:{ '_id': ObjectId(userId) }
            },
            {
                $project:{
                    _id:'$_id',
                    friends:1,
                    followers:1,
                    profilePhoto:1,
                    isFollow:1,
                    deviceToken:1,
                    name:1,
                    userName:1
                }
            }
        ])
        // User.findById({ _id: userId })
            .exec((err, user) => {
                if (err) {
                    reject({ status: 500, message: 'Internal Serevr Error' });
                }
                if (!user) {
                    resolve({ status: 400, message: 'User Not Found' });
                } else {
                    console.log('user========>',user)
                    resolve({ status: 200, message: 'user data Fetched', data: user[0] });
                }
            });
    })
}

/**
*@param {object} userData
*Update User Service
*/
module.exports.updateUser = (userData) => {
    console.log("{{{{{{{{{{{{{{{", userData)
    return new Promise((resolve, reject) => {
        User.findOne({ userName: userData.userName })
            .exec((err, foundUser) => {
                if (err) {
                    console.log('err==================>', err);
                    reject({ status: 500, message: 'Internal Serevr Error' });
                } else if (!foundUser) {
                    User.findOneAndUpdate({ _id: userData.userId }, { $set: { userName: userData.userName } }, { upsert: true, new: true }, function (err, user) {
                        if (err) {
                            console.log('err================>', err)
                            reject({ status: 500, message: 'Internal Serevr Error' });
                        } else {
                            console.log('user======================>', user);
                            console.log("req.file", userData.file);
                            if (userData.file) {
                                userData.profilePhoto = userData.fileName;
                            } else {
                                userData.profilePhoto = user.profilePhoto
                            }
                            User.findOneAndUpdate({ _id: userData.userId }, { $set: { userName: userData.userName, profilePhoto: userData.profilePhoto } }, { upsert: true, new: true }, function (err, user) {
                                if (err) {
                                    reject({ status: 500, message: 'Internal Serevr Error' });
                                } else {
                                    console.log("user========================>", user);
                                    resolve({ status: 200, message: 'user data Fetched', data: user });
                                    // res.status(200).send(user)
                                }
                            })
                        }
                    })
                }
                else {
                    console.log('foundUser==================>', foundUser);
                    if (foundUser._id == userData.userId) {
                        console.log("======================");
                        User.findOneAndUpdate({ _id: userData.userId }, { $set: { userName: userData.userName } }, { upsert: true, new: true }, function (err, user) {
                            if (err) {
                                reject({ status: 500, message: 'Internal Serevr Error' });
                            } else {
                                console.log('user======================>', user);
                                console.log("req.file", userData.file);
                                if (userData.file) {
                                    userData.profilePhoto = userData.fileName;
                                } else {
                                    userData.profilePhoto = user.profilePhoto
                                }
                                User.findOneAndUpdate({ _id: userData.userId }, { $set: { userName: userData.userName, profilePhoto: userData.profilePhoto } }, { upsert: true, new: true }, function (err, user) {
                                    if (err) {
                                        reject({ status: 500, message: 'Internal Serevr Error' });
                                    } else {
                                        console.log("user========================>", user);
                                        resolve({ status: 200, message: 'user data Fetched', data: user });
                                    }
                                })
                            }
                        })

                    } else {
                        console.log("Try other UserName")
                        resolve({ status: 409, message: 'Try other username.....' });
                        // res.status(409).send("Try other username.....")
                    }
                }
            })
    })

}

/**
*@param {String} userId
*get User's friends Service
*/
module.exports.getMyAllFriendsById = (userId) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: userId })
            .exec((err, result) => {
                if (err) {
                    reject({ status: 500, message: 'Internal Serevr Error' });
                } else {
                    User.find({ '_id': { $in: result.friends } })
                        .exec((err, friend) => {
                            if (err) {
                                reject({ status: 500, message: 'Internal Serevr Error' });
                            } else {
                                console.log("==========&%^$&$$%^$%^%&^%$^", friend);
                                resolve({ status: 200, message: "user's friends...", data: friend });
                            }
                        })
                }
            })
    })
}

/**
*@param {String} userIdd
*get User's followers Service
*/
module.exports.getMyFollowersById = (userId) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: userId })
            .exec((err, foundUser) => {
                if (err) {
                    reject({ status: 500, message: 'Internal Serevr Error' });
                } else {
                    User.find({ '_id': { $in: foundUser.followers } })
                        .exec((err, followers) => {
                            if (err) {
                                reject({ status: 500, message: 'Internal Serevr Error' });
                            } else {
                                console.log('followers================>', followers);
                                resolve({ status: 200, message: "user's followers...", data: followers });
                            }
                        })
                }
            })
    })
}

/**
*@param {object} userData
* user login
*/
module.exports.login = (userData) => {
    return new Promise((resolve, reject) => {
        console.log("[[[[[[[[[[", userData)
        User.findOneAndUpdate({ userName: userData.userName },{$set:{deviceToken:userData.deviceToken}},function (err, user) {
            console.log("userrrrrrr", user);
            if (err) {
                reject({ status: 500, message: 'Internal Serevr Error' });
            } else if (!user) {
                reject({ status: 404, message: 'No user found' });
            } else {
                console.log('compare passowrd: ', userData.password, user.password);
                const passwordIsValid = bcrypt.compare(userData.password, user.password);
                console.log('Hello Komal', passwordIsValid);
                if (!passwordIsValid) {
                    reject({ status: 401, message: "password is not valid", auth: false, token: null });
                }
                const token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400
                });
                console.log('token=============>', token);
                resolve({ status: 200, message: "login successfull", data: user, auth: true, token: token });
            }
        });
    })
}
/**
 * Get All user 
 */
module.exports.getAllUser = () => {
    return new Promise((resolve, reject) => {
        User.aggregate([
            { $match: {} }
        ])
            .exec((err, users) => {
                if (err) {
                    reject({ status: 500, message: 'Internal Serevr Error' });
                } else if (users) {
                    // console.log('users==================================>', users);
                    resolve({ status: 200, message: "Users data fetched", data: users });
                } else {
                    resolve({ status: 404, message: "Users not found" });
                }
            })
    })
}

/**
 * @param {String} userId
 * Delete user by id
 */
module.exports.deleteUserById = (userId) => {
    return new Promise((resolve, reject) => {
        User.findOneAndDelete({ _id: userId }).exec((err, user) => {
            if (err) {
                reject({ status: 500, message: 'Internal Serevr Error' });
            } else {
                console.log(user);
                resolve({ status: 200, message: "User deleted", data: user });
            }
        })
    })
}

/**
 * @param {object} userData
 * check user is present or not if not present than create user
 */
module.exports.checkAvailability = (userData) => {
    return new Promise((resolve, reject) => {
        User.findOne({ facebookId: userData.id }, function (err, user) {
            if (err) {
                reject({ status: 500, message: 'Internal Serevr Error' });
            }
            if (user) {
                console.log('user========*************========>', user);
                resolve({ status: 200, message: "User is already exist", data: user });
            } else {
                User.create({
                    id: req.body.id,
                    facebookId: userData.id,
                    token: userData.accessToken,
                    name: userData.name,
                },
                    function (err, user) {
                        if (err) {
                            reject({ status: 500, message: 'There was a problem registering the user' });
                        } else {
                            console.log('user======================>', user)
                            resolve({ status: 200, message: "User register successfully", data: user });
                        }
                    });
            }
        })
    })
}

/**
 * @param {String} key
 * Search user
 */
module.exports.searchUser = (key) => {
    return new Promise((resolve, reject) => {
        User.find({ userName: { $regex: key, $options: 'i' } }, function (err, foundUser) {
            if (err) {
                console.log('==============err============', err)
                reject({ status: 500, message: 'Internal Serevr Error' });
            } else {
                console.log('res===================>', foundUser)
                resolve({ status: 200, message: "User searched..", data: foundUser });
            }
        })
    })
}
/**
 * @param {String} requestedUser
 * @param {String} userTobeFollowed
 * Follow User
 */
module.exports.addFriend = (requestedUser, userTobeFollowed) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: requestedUser, 'friends': userTobeFollowed }, function (err, foundUser) {
            if (err) {
                reject({ status: 500, message: 'Internal Serevr Error' });
            } else if (foundUser) {
                resolve({ status: 200, message: "you already follow" });
            } else {
                User.findOneAndUpdate({ _id: requestedUser }, { $addToSet: { friends: userTobeFollowed } }, { upsert: true, new: true })
                    .exec((err, curruntUser) => {
                        if (err) {
                            reject({ status: 500, message: 'Internal Serevr Error' });
                        } else {
                            console.log('user===========>', curruntUser);
                            User.findOne({ _id: userTobeFollowed, 'followers': requestedUser }, function (err, followUser) {
                                if (err) {
                                    reject({ status: 500, message: 'Internal Serevr Error' });
                                } else {
                                    User.findOneAndUpdate({ _id: userTobeFollowed }, { $addToSet: { followers: requestedUser } }, { upsert: true, new: true })
                                        .exec((err, user) => {
                                            if (err) {
                                                reject({ status: 500, message: 'Internal Serevr Error' });
                                            } else {
                                                console.log("follow user================>", user)
                                                resolve({ status: 200, message: "Follow successfully", data: curruntUser });
                                            }
                                        })
                                }
                            })

                        }
                    })
            }

        })
    })
}


/**
 * @param {String} requestedUser
 * @param {String} userTobeUnFollowed
 * Follow User
 */
module.exports.removeFriend = (requestedUser, userTobeUnFollowed) => {
    return new Promise((resolve, reject) => {
        console.log("data=============>", requestedUser, userTobeUnFollowed)
        User.findOneAndUpdate({ _id: requestedUser, 'friends': userTobeUnFollowed }, { $pull: { friends: userTobeUnFollowed } }, { upsert: true, new: true }, function (err, foundUser) {
            if (err) {
                reject({ status: 500, message: 'Internal Serevr Error' });
            } else if (foundUser) {
                console.log('foundUser ==============>', foundUser);
                User.findOneAndUpdate({ _id: userTobeUnFollowed }, { $pull: { followers: requestedUser } })
                    .exec((err, user) => {
                        if (err) {
                            reject({ status: 500, message: 'Internal Serevr Error' });
                        } else {
                            console.log("user===================>", user);
                            resolve({ status: 200, message: "Unfollow successfully", data: foundUser });
                        }
                    })

            } else {
                console.log("user not found");
                reject({ status: 401, message: 'Bad Request' });
            }
        })
    })
}

/**
 * @param {String} userId
 * Log Out
 */
module.exports.logOut = (userId) => {
    console.log('postId in delete post=====>', userId)
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: userId }, { $set: { deviceToken: '' } }, { upsert: true, new: true }, function (err, user) {
            if (err) {
                reject({ status: 500, message: 'Internal Serevr Error' });
            } else {
                console.log('post============>', user);
                resolve({ status: 200, message: 'Log Out Successfully', data: user });
            }
        })
    })
}