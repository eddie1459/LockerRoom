function make(Schema, mongoose) {
	var topicSchema = new Schema({
	  sportid: { type: String, required: true },
	  teamid: { type: String, required: true },
	  name: { type: String, required: true },
	  timestamp: { type: Date, default: Date.now }
	});
	return mongoose.model('Topic', topicSchema);
}

module.exports.make = make;