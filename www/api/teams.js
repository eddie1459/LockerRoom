function make(app, model, io) {
	app.get('/api/team', function(req, res) {
      return model.find({ 
      	  stateid: req.params.stateid,
      	  sportid: req.params.sportid
        }, function(err, teams) {
	    if (!err) {
			res.contentType('application/json');
			console.log(req.params);
			
			return res.send(teams);
	    } else {
	      return console.log(err);
	    }
	  });
	});
}

module.exports.make = make;