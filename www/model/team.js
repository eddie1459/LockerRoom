function make(Schema, mongoose) {
	var teamSchema = new Schema({
      stateid: { type: String, required: true },
	  sportid: { type: String, required: true },
	  name: { type: String, required: true },
	  timestamp: { type: Date, default: Date.now }
	});
	return mongoose.model('Team', teamSchema);
}

module.exports.make = make;