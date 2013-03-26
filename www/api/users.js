function make(app, model, io) {
	app.get('/api/user', function(req, res) {
	  var id = req.user.openId;
	  return model.findOne({ openId: identifier }, function (err, user) {
	  	if (!err) {
          return res.send(user);
	  	} else {
          return console.log(err);
	  	}
	  });
	});
}

module.exports.make = make;