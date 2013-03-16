var state, sport, team, topic, comment, user;

function initialize(app) {
	var mongoose = require('mongoose');
	var db = mongoose.connect(app.get('mongodbconn'));
	var schema = mongoose.Schema;

	this.state = require('./state').make(schema, mongoose);
	this.sport = require('./sport').make(schema, mongoose);
	this.team = require('./team').make(schema, mongoose);
	this.topic = require('./topic').make(schema, mongoose);
	this.comment = require('./comment').make(schema, mongoose);
	this.user = require('./user').make(schema, mongoose);
}

module.exports.initialize = initialize;
module.exports.state = state;
module.exports.sport = sport;
module.exports.team = team;
module.exports.topic = topic;
module.exports.comment = comment;
module.exports.user = user;