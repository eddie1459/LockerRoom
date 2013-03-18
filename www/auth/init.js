function initialize(app, passport, model) {
	var googleAuth = require('./google'),
	    facebookAuth = require('./facebook'),
	    twitterAuth = require('./twitter');

	passport.serializeUser(function(user, done) {
	  console.log("Serialized User: " + user);
	  done(null, user);
	});

	// function findById(id, fn) {
	//   var idx = id - 1;
	//   if (users[idx]) {
	//     fn(null, users[idx]);
	//   } else {
	//     fn(new Error('User ' + id + ' does not exist'));
	//   }
	// }

	passport.deserializeUser(function(id, done) {
	  model.user.findOne(id, function (err, user) {
	  	console.log("De-serialized User" + user);
	    done(err, user);
	  });
	  
	});
		// findById(id, function (err, user) {
	 	//    	done(err, user);
	 	//  	});
	  
	googleAuth.initialize(passport, app, model);
	facebookAuth.initialize(passport, app);
	// twitterAuth.initialize(passport, app);
}

module.exports.initialize = initialize;