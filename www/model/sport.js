function make(Schema, mongoose) {
	var sportSchema = new Schema({
	  name: { type: String, required: true },
	  timestamp: { type: Date, default: Date.now }
	});
	return mongoose.model('Sport', sportSchema);
}

module.exports.make = make;