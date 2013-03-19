function initialize(app, passport, model, logger) {
	var googleAuth = require('./google'),
	    facebookAuth = require('./facebook'),
	    twitterAuth = require('./twitter');

	// passport.serializeUser(function(user, done) {
	// 	logger.info("Serializing user: " + user._id);
	//   	done(null, user._id);
	// });

	// passport.deserializeUser(function(id, done) {
	// 	logger.info("Deserializing user: " + id);
	//   accounts.findOne(id, function (err, user) {
	//     done(err, user);
	//   });
	// });

	passport.serializeUser(function(user, done) {
	  	logger.info("Serializing user: " + user._id);
	  	done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		var o_id = new BSON.ObjectID(id);
		logger.info("Deserializing user: " + o_id);
		accounts.findOne({_id:o_id}, function (err, user) {
			done(err, user);
		});
	});

	// passport.serializeUser(function(user, done) {
	//   logger.info("Serialized User: " + user._id);
	//   console.log(user._id);
	//   done(null, user._id);
	// });

	// function findById(id, fn) {
	//   var idx = id - 1;
	//   if (users[idx]) {
	//     fn(null, users[idx]);
	//   } else {
	//     fn(new Error('User ' + id + ' does not exist'));
	//   }
	// }

	// passport.deserializeUser(function(id, done) {
	//   model.user.findOne(id, function (err, user) {
	//   	//  console.log("De-serialized User" + user);
	//     done(err, user);
	//   });
	// });
		// findById(id, function (err, user) {
	 	//    	done(err, user);
	 	//  	});
	  
	googleAuth.initialize(passport, app, model);
	facebookAuth.initialize(passport, app);
	// twitterAuth.initialize(passport, app);
}

module.exports.initialize = initialize;