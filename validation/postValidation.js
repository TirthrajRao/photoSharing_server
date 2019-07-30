const Joi = require('joi');


module.exports.addPost = (req, res, next) => {
    console.log('req.body=======>', req.body)
    const addPostchema = Joi.object().keys({
        userId: Joi.string().required(),
        content: Joi.any(),
        hashTag: Joi.array()
    })
    Joi.validate(
        req.body,
        addPostchema,
        { convert: true },
        (err, value) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    message: 'Bad request'
                });
            } else {
                console.log("================", req.file);
                if (req.file.filename) {
                    next();
                }
            }
        }
    );
}

module.exports.likePost = (req, res, next) => {
    const addPostSchema = Joi.object().keys({
        postId: Joi.string().required(),
        userId: Joi.string().required()
    })
    Joi.validate(
        req.body,
        addPostSchema,
        { convert: true },
        (err, value) => {
            if (err) {
                return res.status(400).json({
                    message: 'Bad request'
                });
            } else {
                next();
            }
        }
    );
}


module.exports.addHashTag = (req, res, next) => {
    const addTagSchema = Joi.object().keys({
        hashTag: Joi.string().required(),
    })
    Joi.validate(
        req.body,
        addTagSchema,
        { convert: true },
        (err, value) => {
            if (err) {
                return res.status(400).json({
                    message: 'Bad request'
                });
            } else {
                next();
            }
        }
    );
}

module.exports.sharePost = (req, res, next) => {
    const sharePostSchema = Joi.object().keys({
        srcId: Joi.string().required(),
        desId: Joi.string().required(),
        postId: Joi.string().required(),
    })
    Joi.validate(
        req.body,
        sharePostSchema,
        { convert: true },
        (err, value) => {
            if (err) {
                return res.status(400).json({
                    message: 'Bad request'
                });
            } else {
                next();
            }
        }
    );
}

module.exports.searchPost = (req, res, next) => {
    const serachPostSchema = Joi.object().keys({
        key: Joi.string().required(),
    })
    Joi.validate(
        req.body,
        serachPostSchema,
        { convert: true },
        (err, value) => {
            if (err) {
                return res.status(400).json({
                    message: 'Bad request'
                });
            } else {
                next();
            }
        }
    );
}


module.exports.updatePost = (req, res, next) => {
    const updatePostSchema = Joi.object().keys({
        content: Joi.string().required(),
        hashTag: Joi.array(),
        postId: Joi.string().required()
    })
    Joi.validate(
        req.body,
        updatePostSchema,
        { convert: true },
        (err, value) => {
            if (err) {
                console.log('err=============>', err)
                return res.status(400).json({
                    message: 'Bad request'
                });
            } else {
                next();
            }
        }
    );
}

module.exports.deletePost = (req, res, next) => {
    console.log("req.body in deletepost validation===========>",req.body.payload)
    const deletePostSchema = Joi.object().keys({
        postId: Joi.string().required()
    })
    Joi.validate(
        req.body.payload,
        deletePostSchema,
        { convert: true },
        (err, value) => {
            if (err) {
                console.log('err=============>', err)
                return res.status(400).json({
                    message: 'Bad request'
                });
            } else {
                next();
            }
        }
    );
}
