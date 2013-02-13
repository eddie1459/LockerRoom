function make(Schema, mongoose) {
	var commentSchema = new Schema({
	  topicid: { type: String, required: true },
	  commentcontent: { type: String, required: true },
	  timestamp: { type: Date, default: Date.now }
	});
	return mongoose.model('Comment', commentSchema);
}

module.exports.make = make;