function make(Schema, mongoose) {
	var userSchema = new Schema({
	  name: { type: String, required: true },
	  handle: { type: String, required: false },
	  openId: { type: String, required: true },
	  agreed: { type: Boolean, required: false },
	  teams: { type: Array, required: false },
	  timestamp: { type: Date, default: Date.now }
	});
	return mongoose.model('User', userSchema);
}

module.exports.make = make;