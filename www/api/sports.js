function make(app, model, io) {
	app.get('/api/sport', function(req, res) {
	  return model.find(function(err, sports) {
	    if (!err) {
	      return res.send(sports);
	    } else {
	      return console.log(err);
	    }
	  });
	});
}

module.exports.make = make;