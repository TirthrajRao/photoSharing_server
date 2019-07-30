const Joi = require('joi');

module.exports.addUser = (req, res, next) => {
    const addUserSchema = Joi.object().keys({
        name: Joi.string().required(),
        userName: Joi.string().required(),
        password: Joi.any().required(),
        email: Joi.string().required(),
    })
    Joi.validate(
        req.body,
        addUserSchema,
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


module.exports.searchUser = (req, res, next) => {
    const searchUserSchema = Joi.object().keys({
        key: Joi.string().required(),
    })
    Joi.validate(
        req.body,
        searchUserSchema,
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


module.exports.login = (req,res,next) =>{
    const loginUserSchema = Joi.object().keys({
        password:Joi.string().required(),
        userName:Joi.string().required(),
        deviceToken:Joi.string().required()
    })

    Joi.validate(      
        req.body,
        loginUserSchema,

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

module.exports.fbLogin = (req,res,next) =>{
    const loginUserSchema = Joi.object().keys({
        id:Joi.string().required(),
        facebookId:Joi.string().required(),
        token:Joi.string().required(),
        name:Joi.string().required(),
    })

    Joi.validate(      
        req.body,
        loginUserSchema,

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

module.exports.follow = (req, res, next) => {
    const followUserSchema = Joi.object().keys({
        requestedUser: Joi.string().required(),
        userTobeFollowed: Joi.string().required(),
    })
    Joi.validate(
        req.body,
        followUserSchema,
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

module.exports.unfollow = (req, res, next) => {
    const unfollowUserSchema = Joi.object().keys({
        requestedUser: Joi.string().required(),
        userTobeUnFollowed: Joi.string().required(),
    })
    Joi.validate(
        req.body,
        unfollowUserSchema,
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

module.exports.upadteUser = (req, res, next) => {
    console.log("req.body in upadate user validation=========>",req.body)
    const upadteUserSchema = Joi.object().keys({
        userId: Joi.string().required(),
        userName: Joi.string().required(),
    })
    Joi.validate(
        req.body,
        upadteUserSchema,
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


