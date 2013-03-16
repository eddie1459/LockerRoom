function initialize(app) {
	var passport = require('passport'),
	    googleAuth = require('./auth/google'),
	    facebookAuth = require('./auth/facebook'),
	    twitterAuth = require('./auth/twitter');

	passport.serializeUser(function(user, done) {
	  console.log("Serialized User" + user);
	  done(null, user.name);
	});

	passport.deserializeUser(function(name, done) {
	  console.log("De-serialized User" + name);
	  done(null, {name: name});
	});

	googleAuth.initialize(passport, app);
	facebookAuth.initialize(passport, app);
	// twitterAuth.initialize(passport, app);
}

module.exports.initialize = initialize;