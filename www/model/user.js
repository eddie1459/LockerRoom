function make(Schema, mongoose) {
	var userSchema = new Schema({
	  name: { type: String, required: true },
	  handle: { type: String, required: true },
	  openId: { type: String, required: true },
	  agreed: { type: Boolean, required: true },
	  teams: { type: Array, required: false },
	  timestamp: { type: Date, default: Date.now }
	});
	return mongoose.model('User', userSchema);
}

module.exports.make = make;