var state, sport, team, topic, comment, user;

function initialize(app) {
	var mongoose = require('mongoose');
	var db = mongoose.connect(app.get('mongodbconn'));
	var schema = mongoose.Schema;

	this.state = require('./model/state').make(schema, mongoose);
	this.sport = require('./model/sport').make(schema, mongoose);
	this.team = require('./model/team').make(schema, mongoose);
	this.topic = require('./model/topic').make(schema, mongoose);
	this.comment = require('./model/comment').make(schema, mongoose);
	this.user = require('./model/user').make(schema, mongoose);
}

module.exports.initialize = initialize;
module.exports.state = state;
module.exports.sport = sport;
module.exports.team = team;
module.exports.topic = topic;
module.exports.comment = comment;
module.exports.user = user;