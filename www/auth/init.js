function initialize(app, passport, model) {
	var googleAuth = require('./google'),
	    facebookAuth = require('./facebook'),
	    twitterAuth = require('./twitter');

	passport.serializeUser(function(user, done) {
	  console.log("Serialized User" + user);
	  done(null, user.name);
	});

	// function findById(id, fn) {
	//   var idx = id - 1;
	//   if (users[idx]) {
	//     fn(null, users[idx]);
	//   } else {
	//     fn(new Error('User ' + id + ' does not exist'));
	//   }
	// }

	passport.deserializeUser(function(name, done) {
		// findById(id, function (err, user) {
	 	//    	done(err, user);
	 	//  	});
	  console.log("De-serialized User" + name);
	  done(null, {name: name});
	});

	googleAuth.initialize(passport, app, model);
	facebookAuth.initialize(passport, app);
	// twitterAuth.initialize(passport, app);
}

module.exports.initialize = initialize;