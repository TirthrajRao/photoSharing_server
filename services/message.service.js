const messageModel = require('../model/message.model');
const postModel = require('../model/post.model');
const ObjectId = require('mongodb').ObjectId;

/**
 * @param {object} postData
 * Share post
 */
module.exports.sharedPost = (postData) => {
    const message = new messageModel(postData);
    console.log("postData========>",postData)
    return new Promise((resolve, reject) => {
        messageModel.findOne({ $and: [{ 'desId': postData.desId }, { 'srcId': postData.srcId }] }, function (err, foundUser) {
            if (err) {
                console.log('err=================>', err)
                reject({ status: 500, message: 'Internal Serevr Error' });
            } else if (foundUser) {
                console.log("founduser=========================>", foundUser);
                console.log("=============founduser post=================>", foundUser.postId);
                foundUser.postId.push(postData.postId);
                foundUser.save();
                postModel.findOneAndUpdate({ _id: postData.postId }, { $inc: { sharePostCount: 1 } }, { upsert: true, new: true }, function (err, foundPost) {
                    if (err) {
                        console.log('err=================>', err)
                        reject({ status: 500, message: 'Internal Serevr Error' });
                    } else {
                        console.log("=============founduser post=================>", foundPost);
                        console.log("=============founduser post sharecount=================>", foundPost.sharePostCount);
                        resolve({ status: 200, message: ' Post Shared', data: foundUser });
                    }
                })
            } else {
                message.save((err, post) => {
                    if (err) {
                        console.log('err=================>', err)
                        reject({ status: 500, message: 'Internal Serevr Error' });
                    } else {
                        console.log("posttt=============================>", post);
                        postModel.findOneAndUpdate({ _id: postData.postId }, { $inc: { sharePostCount: 1 } }, { upsert: true, new: true }, function (err, foundPost) {
                            if (err) {
                                console.log('err=================>', err)
                                reject({ status: 500, message: 'Internal Serevr Error' });
                            } else {
                                console.log("=============founduser post=================>", foundPost);
                                console.log("=============founduser post sharecount=================>", foundPost.sharePostCount);
                                resolve({ status: 200, message: ' Post Shared', data: post });
                            }
                        })
                    }
                })
            }
        })
    })
}

/**
 * @param {String} curruntUserId
 * get user whose Shared post
 */
module.exports.getShardPost = (curruntUserId) => {
    return new Promise((resolve, reject) => {
        messageModel.aggregate([
            {
                $match: { 'desId': ObjectId(curruntUserId) }
            },
            //Find Curruntuser Shared Posts 
            {
                $lookup: {
                    from: 'users',
                    localField: 'srcId',
                    foreignField: '_id',
                    as: 'srcId'
                }
            },
            // Lookup From user to get SrcId User Details
            {
                $unwind: {
                    path: '$srcId',
                    preserveNullAndEmptyArrays: true,
                }
            },
            // Unwind srcId to make object from Array
            {
                $project: {
                    _id: 1,
                    postId: 1,
                    desId: 1,
                    srcId: {
                        _id: '$srcId._id',
                        userName: '$srcId.userName',
                        profilePhoto: '$srcId.profilePhoto'
                    }
                }
            }
            //project to get only needed field from srcId
        ])
            .exec((err, users) => {
                if (err) {
                    console.log("========================>", err);
                    reject({ status: 500, message: 'Internal Serevr Error' });
                } else {
                    console.log("response===========================>", users);
                    resolve({ status: 200, message: 'User Fetched whose Shared Post', data: users });
                }
            })
    })
}

/**
 * @param {String} _id
 * get Shared post
 */
module.exports.getPostsById = (id) => {
    return new Promise((resolve, reject) => {
        messageModel.aggregate([
            {
                $match: { '_id': ObjectId(id) }
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'postId',
                    foreignField: '_id',
                    as: 'postId'
                }
            },
            // Lookup from post to get post Details
            {
                $unwind: {
                    path: '$postId',
                    preserveNullAndEmptyArrays: true,
                }
            },
            // unwind postId to make object from Array
            {
                $lookup: {
                    from: 'users',
                    localField: 'postId.userId',
                    foreignField: '_id',
                    as: 'postId.userId'
                }
            },
            // Lookup from user to get user details
            {
                $unwind: {
                    path: '$postId.userId',
                    preserveNullAndEmptyArrays: true,
                }
            },
            // Unwind userId to make onject from Array 
            {
                $group: {
                    _id: '$_id',
                    srcId: { $first: '$srcId' },
                    desId: { $first: '$desId' },
                    postId: { $push: '$postId' },
                }
            },
            // group postId to get shared Post with this srcId and destId
        ])
            .exec((err, posts) => {
                if (err) {
                    console.log("========================>", err);
                    reject({ status: 500, message: 'Internal Serevr Error' });
                } else {
                    console.log("response===========================>", posts[0]);
                    resolve({ status: 200, message: 'Shared Post Fetched', data: posts[0] });
                }
            })
    })
}