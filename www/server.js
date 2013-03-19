var express = require('express'),
    path = require('path'),
    auth = require('./auth/init'),
    model = require('./model/init'),
    api = require('./api/init');
    util = require('util'),
    http = require('http'),
    passport = require('passport'),
    SessionStore = require("session-mongoose")(express),
    store = new SessionStore({
        url: "mongodb://localhost/session",
        interval: 120000 // expiration check worker run interval in millisec (default: 60000)
    });

var winston = require('winston');
winston.add(winston.transports.File, { filename: 'winston-log.log' });
winston.remove(winston.transports.Console);
winston.info('Winston Initialized!!!');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.cookieParser('welovesports'));
    app.use(express.session());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/'));
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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  
  res.redirect('/login.html')
}

// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/login.html');
// });

// app.get('/account', function(req, res){
//   winston.info("User Id: " + req.user);
//   res.render('account', { user: req.user });
// });

app.use(express.errorHandler());

// NOTE:  If you hit this get again after logging in
//        you can see winston has logged the req.user!
// TODO:  Can we use jade templates here to display user info
//        on the home page?
app.get("/", ensureAuthenticated, function(req, res) {
    winston.info("User Id: " + req.user);
    res.redirect('/home', { 
      user: req.user
    });
});

app.get("/home", ensureAuthenticated, function(req, res) {
    winston.info("User Id: " + req.user);
    res.redirect('/home.html');
});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  winston.info("Express server listening on port " + app.get('port'));
});

// begin socket.io config
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
  // console.log('Socket Connection Made - Server Side');
  socket.on("leaveRoom", function(data){
      // console.log('Leaving room ' + data.room);
      socket.leave(data.room);
  });
  socket.on("setRoom", function(data){
      // console.log('Joining room ' + data.room);
      socket.join(data.room);
  });

  socket.on('comment', function(data) {
    // console.log('Emitting comment');
    socket.broadcast.to(data.room).emit('comment', data.comment);
  });
});
// end socket.io config

model.initialize(app);
api.initialize(app, model, io);
auth.initialize(app, passport, model, winston);

// export NODE_ENV=development
// console.log(process.env.NODE_ENV);