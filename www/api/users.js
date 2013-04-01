function make(app, model, io) {
	app.get('/api/user', function(req, res) {
	  //this will get req.user if you start on the provider
	  //page and choose one.  Not sure how to get the user
	  //session persisted no matter what page you are on.
	  var oid = req.user.openId;
	  return model.findOne({ openId: oid }, function (err, user) {
	  	if (!err) {
          return res.send(user);
	  	} else {
          return console.log(err);
	  	}
	  });
	});
}

module.exports.make = make;