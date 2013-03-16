function initialize(passport, app) {
	var strategy = require('passport-facebook');

	//this doesn't work locally
	passport.use(new strategy.Strategy({
	   clientID: 449861405085618,
	   clientSecret: '9429d223349512284f0a15d52186447d',
	   callbackURL: "http://lockerroom.jit.su/auth/facebook/callback"
	   //callbackURL: "http://localhost:3000/auth/facebook/callback"
	 }, function(accessToken, refreshToken, profile, done) {
   			//asynchronous verification, for effect...
		   process.nextTick(function () {
		      
		      // To keep the example simple, the user's Facebook profile is returned to
		      // represent the logged-in user.  In a typical application, you would want
		      // to associate the Facebook account with a user record in your database,
		      // and return that user instead.
		     return done(null, profile);
		   });
	 	}
	));

	// Redirect the user to Facebook for authentication.  When complete,
	// Facebook will redirect the user back to the application at
	//     /auth/facebook/callback
	app.get('/auth/facebook', passport.authenticate('facebook'));

	// Facebook will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.
	app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' })
	);
}

module.exports.initialize = initialize;