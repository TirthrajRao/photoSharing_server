const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	postId: [{ type: Schema.ObjectId, ref: 'post' }],
	srcId: { type: Schema.Types.ObjectId, ref: 'user' },
	desId: { type: Schema.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('message', MessageSchema);