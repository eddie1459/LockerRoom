var states, sports, teams, topics, comments;

function initialize(app, model, io) {
	//var mongoose = require('mongoose');
	//var db = mongoose.connect(app.get('mongodbconn'));
	//var schema = mongoose.Schema;

	this.states = require('./states').make(app, model.state, io);
	this.sports = require('./sports').make(app, model.sport, io);
	this.teams = require('./teams').make(app, model.team, io);
	this.topics = require('./topics').make(app, model.topic, io);
	this.comments = require('./comments').make(app, model.comment, io);
}

module.exports.initialize = initialize;
module.exports.states = states;
module.exports.sports = sports;
module.exports.teams = teams;
module.exports.topics = topics;
module.exports.comments = comments;