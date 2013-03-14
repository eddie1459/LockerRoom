var express = require('express'),
    path = require('path'),
    passport = require('passport'),
    util = require('util'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google').Strategy,
    http = require('http'),
    mongoose = require('mongoose');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new GoogleStrategy({
    returnURL: 'http://lockerroom.jit.su/auth/google/return',
    realm: 'http://lockerroom.jit.su/'
    //testing
    //returnURL: 'http://localhost:3000/auth/google/return',
    //realm: 'http://localhost:3000/'
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

//this doesn't work locally
//passport.use(new FacebookStrategy({
//    clientID: 449861405085618,
//    clientSecret: '9429d223349512284f0a15d52186447d',
//    callbackURL: "http://lockerroom.jit.su/auth/facebook/callback"
    //callbackURL: "http://localhost:3000/auth/facebook/callback"
//  },
//  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
//    process.nextTick(function () {
      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
//      return done(null, profile);
//    });
//  }
//));

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser()),
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/')),
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.set('mongodbconn', 'mongodb://localhost/lockerroomdb');
  app.set('socketaddress', 'http://localhost:3000');
});

app.configure('production', function(){
  app.set('mongodbconn', 'mongodb://nodejitsu:b2b6257726a49559a610f26d5d82ad7b@linus.mongohq.com:10094/nodejitsudb9733627908');
  app.set('socketaddress', 'http://lockerroom.jit.su');
});

// begin db stuff
var db = mongoose.connect(app.get('mongodbconn'));
var Schema = mongoose.Schema;
var stateModel = require('./model/state.js').make(Schema, mongoose);
var sportModel = require('./model/sport.js').make(Schema, mongoose);
var teamModel = require('./model/team.js').make(Schema, mongoose);
var topicModel = require('./model/topic.js').make(Schema, mongoose);
var commentModel = require('./model/comment.js').make(Schema, mongoose);
var userModel = require('./model/user.js').make(Schema, mongoose);
// end db stuff

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.get('/auth/google',
  passport.authenticate('google'));

app.get('/auth/google/return', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(res);
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.use(express.errorHandler());

// TODO:  Routes are cooler because we can feed em configuration options!
app.get("/", function (req, res) {
    res.render('index', { user: req.user });
    //res.redirect("index.html");
});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// begin socket.io config
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
  console.log('Socket Connection Made - Server Side');
  socket.on("leaveRoom", function(data){
      console.log('Leaving room ' + data.room);
      socket.leave(data.room);
  });
  socket.on("setRoom", function(data){
      console.log('Joining room ' + data.room);
      socket.join(data.room);
  });

  socket.on('comment', function(data) {
    console.log('Emitting comment');
    socket.broadcast.to(data.room).emit('comment', data.comment);
  });
});
// end socket.io config

// begin require in api
var states = require('./api/states.js');
var sports = require('./api/sports.js');
var teams = require('./api/teams.js');
var topics = require('./api/topics.js');
var comments = require('./api/comments.js');
// end require in api

// begin make api
var statesApi = states.make(app, stateModel, io);
var sportsApi = sports.make(app, sportModel, io);
var teamsApi = teams.make(app, teamModel, io);
var topicsApi = topics.make(app, topicModel, io);
var commentsApi = comments.make(app, commentModel, io);
// end make api

// export NODE_ENV=development
// console.log(process.env.NODE_ENV);