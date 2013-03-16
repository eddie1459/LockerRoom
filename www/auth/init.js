function initialize(app, passport, model) {
	var googleAuth = require('./google'),
	    facebookAuth = require('./facebook'),
	    twitterAuth = require('./twitter');

	passport.serializeUser(function(user, done) {
	  console.log("Serialized User" + user);
	  done(null, user.name);
	});

	passport.deserializeUser(function(name, done) {
	  console.log("De-serialized User" + name);
	  done(null, {name: name});
	});

	googleAuth.initialize(passport, app, model);
	facebookAuth.initialize(passport, app);
	// twitterAuth.initialize(passport, app);
}

module.exports.initialize = initialize;