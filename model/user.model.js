const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    name: String,
    userName: String,
    email: String,
    password: String,
    facebookId: String,
    token: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    followers: [{ type: Schema.ObjectId, ref: 'user' }],
    profilePhoto: { type: String, default: '' },
    isFollow:{type:Boolean,default:false}, //Flag for Follow user or not
    deviceToken: { type: String, default: '' }
});

UserSchema.pre('save', function (next) {
    const user = this;
    console.log("Im Model=====================>", user.password);
    // if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            console.log('hash: ', hash);
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('user', UserSchema);