var express = require('express'),
    path = require('path'),
    http = require('http'),
    mongoose = require('mongoose');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser()),
    app.use(express.static(__dirname + '/'))
});

app.use(express.errorHandler());

app.configure('development', function(){
  app.use(express.errorHandler());
  app.set('mongodbconn', 'mongodb://localhost/lockerroomdb');
  app.set('socketaddress', 'http://localhost:3000');
});

app.configure('production', function(){
  app.set('mongodbconn', 'mongodb://nodejitsu:b2b6257726a49559a610f26d5d82ad7b@linus.mongohq.com:10094/nodejitsudb9733627908');
  app.set('socketaddress', 'http://notifier.jit.su');
});

// TODO:  Routes are cooler because we can feed em configuration options!
app.get("/", function (req, res) {
    res.redirect("index.html");
});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// begin db stuff
var db = mongoose.connect(app.get('mongodbconn'));
var Schema = mongoose.Schema;
var stateModel = require('./model/state.js').make(Schema, mongoose);
var sportModel = require('./model/sport.js').make(Schema, mongoose);
var teamModel = require('./model/team.js').make(Schema, mongoose);
var topicModel = require('./model/topic.js').make(Schema, mongoose);
var commentModel = require('./model/comment.js').make(Schema, mongoose);
// end db stuff

// begin require in api
var states = require('./api/states.js');
var sports = require('./api/sports.js');
var teams = require('./api/teams.js');
var topics = require('./api/topics.js');
var comments = require('./api/comments.js');
// end require in api

// begin socket.io config
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
  // TODO:  Define the live interaction!
  // socket.on('SignOn', function (data) {
  //   console.log("userid received: " + data);

  //   socket.set("userid", data.userid, function() {
  //     console.log("userid stored: " + data.userid);
  //   });
    
  //   socket.emit('SignedOn', data);            // this user
  //   socket.broadcast.emit('SignedOn', data);  // everyone
  // });

  // socket.on('AddNotification', function (data) {
  //   notifications.addNotification(nModel, io, data);
  // });

  // socket.on('DeleteAllNotifications', function () {
  //   notifications.deleteAll(nModel, io);
  // });
});
// end socket.io config

// begin make api
var statesApi = states.make(app, stateModel, io);
var sportsApi = sports.make(app, sportModel, io);
var teamsApi = teams.make(app, teamModel, io);
var topicsApi = topics.make(app, topicModel, io);
var commentsApi = comments.make(app, commentModel, io);
// end make api

// export NODE_ENV=development
// console.log(process.env.NODE_ENV);