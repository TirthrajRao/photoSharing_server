const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	content: String,
	images: String,
	userId: { type: Schema.Types.ObjectId, ref: "user" },
	like: [{
		type: Schema.Types.ObjectId,
		ref: "user"
	}],
	comment: [{
		type: Schema.Types.ObjectId,
		ref: "comment"
	}],
	created_date: {
		type: Date,
		default: new Date()
	},
	isLiked: { type: Boolean, default: false }, // If post is Liked by user than this flage is true
	hashTag: [],
	sharePostCount: { type: Number, default: 0 },
	isDelete: { type: Boolean, default: false },
});

module.exports = mongoose.model('post', postSchema);