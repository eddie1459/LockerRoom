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

	app.put('/api/user/:id', function(req, res) {
		return model.findById(req.params.id, function(err, t) {
		  t.handle = req.body.handle;
		  t.agreed = req.body.agreed;
		  return t.save(function(err) {
		  	if (!err) {
		  		console.log("updated");
		  	} else {
		  		console.log(err);
		  	}
		  	return res.send(t);
		  });
		});
	});
}

module.exports.make = make;