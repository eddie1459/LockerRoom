function make(app, model, io) {
	app.get('/api/user/:id', function(req, res) {
	  // TODO:  This should be able to handle getting the user id itself...somehow...maybe a separate api call???
	  return model.user.findOne(id, function (err, user) {
	  	if (!err) {
          return res.send(user);
	  	} else {
          return console.log(err);
	  	}
	  });
	});
}

module.exports.make = make;