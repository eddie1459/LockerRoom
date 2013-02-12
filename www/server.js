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

// TODO:  Routes are cooler. 
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
var sportModel = require('./model/state.js').make(Schema, mongoose);
// end db stuff

// TODO:  Wire in Mongoose models
// TODO:  Wire in API