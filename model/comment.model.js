const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	postId: { type: Schema.Types.ObjectId, ref: "post" },
	userId: { type: Schema.Types.ObjectId, ref: "user" },
	comment: String
});

module.exports = mongoose.model('comment', commentSchema);