function initialize(passport, app) {
	var strategy = require('passport-google');

	passport.use(new strategy.Strategy({
	    //returnURL: 'http://lockerroom.jit.su/auth/google/return',
	    //realm: 'http://lockerroom.jit.su/'
	    //testing
	    returnURL: 'http://localhost:3000/auth/google/return',
	    realm: 'http://localhost:3000/'
	  },
	  function(identifier, profile, done) {
	    console.log(profile.dislpayName);
	    userModel.findOne({ openId: identifier }, function (err, userFound) {
	      if (err) { console.log(err) };
	      console.log(userFound);
	      if (!userFound) {
	        var user = new userModel({ name: profile.displayName, openId: identifier} );
	        user.save(function(err) {
	          console.log("User Saved!")
	        });
	      };
	    });
	    
	    return done(null, profile);
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