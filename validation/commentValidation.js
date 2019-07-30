const Joi = require('joi');

module.exports.addComment = (req, res, next) => {
    const addCommentchema = Joi.object().keys({
        comment: Joi.string().required(),
        postId: Joi.string().required(),
        userId: Joi.string().required(),
    })
    Joi.validate(
        req.body,
        addCommentchema,
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