function initialize(passport, app, model) {
	var strategy = require('passport-google');

	passport.use(new strategy.Strategy({
	    //returnURL: 'http://lockerroom.jit.su/auth/google/return',
	    //realm: 'http://lockerroom.jit.su/'
	    //testing
	    returnURL: 'http://localhost:3000/auth/google/return',
	    realm: 'http://localhost:3000/'
	  },
	  function(identifier, profile, done) {
	    console.log(profile);
	    model.user.findOne({ openId: identifier }, function (err, userFound) {
	      if (err) { console.log(err) };
	      console.log("User was found: " + userFound);
	      if (!userFound) {
	        var user = new model.user({ name: profile.displayName, openId: identifier} );
	        user.save(function(err) {
	          console.log("User Saved!")
	        });
	      } else {
	      	console.log("User being processed!");
	      	done(null, userFound);
	      }
	    });
	  }
	));

	app.get('/auth/google', passport.authenticate('google'));

	app.get('/auth/google/return', 
	  passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
	    // Successful authentication, redirect home.
	    console.log(res);
	    res.redirect('/home.html');
	  }
	);
}

module.exports.initialize = initialize;