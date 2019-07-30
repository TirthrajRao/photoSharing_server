const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HashTagSchema = new Schema({
	hashTag: String,
	count: { type: Number, default: 1 }
});

module.exports = mongoose.model('hashtag', HashTagSchema);