function make(app, model, io) {
	app.get('/api/state', function(req, res) {
	  return model.find(function(err, states) {
	    if (!err) {
	    	//console.log(states);
	      	return res.send(states);
	    } else {
	      	return console.log(err);
	    }
	  });
	});
}

module.exports.make = make;