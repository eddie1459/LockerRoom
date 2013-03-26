function initialize(app, passport, model, logger) {
	var googleAuth = require('./google'),
	    facebookAuth = require('./facebook'),
	    twitterAuth = require('./twitter');

	passport.serializeUser(function(user, done) {
		// logger.info("Serializing user: " + user._id);
	  	done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		// logger.info("Deserializing user: " + id);
	    model.user.findOne(id, function (err, user) {
	    	done(err, user);
	  	});
	});
	  
	googleAuth.initialize(passport, app, model);
	facebookAuth.initialize(passport, app);
	// twitterAuth.initialize(passport, app);
}

module.exports.initialize = initialize;