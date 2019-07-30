const commentModel = require('../model/comment.model');
const postModel = require('../model/post.model');
/**
 * @param {object} commentData
 * add comment
 */
module.exports.addComment = (commentData) => {
    console.log("[[[[[[[[[", commentData)
    const Comment = new commentModel(commentData);
    console.log("]]]]]]]]]]]]]]]]]]", Comment)
    return new Promise((resolve, reject) => {
        Comment.save((err, comments) => {
            if (err) {
                res.status(500).send({ message: 'Internal server error' })
            } else {
                postModel.findOneAndUpdate({ _id: commentData.postId }, { $push: { comment: comments._id } })
                    .exec((err, post) => {
                        if (err) {
                            reject({ status: 500, message: 'Internal Serevr Error' });
                        } else {
                            // console.log('post============================>', post);
                            // console.log('comment=============================>', comments)
                            resolve({ status: 200, message: 'comment added sucessfully', data: comments });
                        }
                    })
            }
        })
    })
}