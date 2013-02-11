function make(Schema, mongoose) {
	var stateSchema = new Schema({
	  name: { type: String, required: true },
	  abbreviation: { type: String, required: true },
	  timestamp: { type: Date, default: Date.now }
	});
	return mongoose.model('State', stateSchema);
}

module.exports.make = make;