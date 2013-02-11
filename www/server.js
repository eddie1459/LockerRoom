var express = require('express'),
    path = require('path'),
    http = require('http')

var app = express();

app.get("/", function (req, res) {
    res.redirect("index.html");
});

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser()),
    app.use(express.static(__dirname + '/'))
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Server listening on port " + app.get('port'));
});