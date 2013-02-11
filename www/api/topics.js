function make(app, model, io) {
	app.get('/api/topic', function(req, res) {
      return model.find({ 
      	  sportid: req.params.sportid,
      	  teamid: req.params.teamid,
      	  count: req.params.count,		// get the last 20?
      	  since: req.params.since		// get since?
        }, function(err, topics) {
	    if (!err) {
			res.contentType('application/json');
			console.log(req.params);
			
			return res.send(topics);
	    } else {
	      return console.log(err);
	    }
	  });
	});

	app.post('/api/topic', function(req, res) {	  
	  // TODO:  Implement persistence
	  //var n = addTopic(model, io, req.body);	  
	  //return res.send(n);
	});
}

module.exports.make = make;