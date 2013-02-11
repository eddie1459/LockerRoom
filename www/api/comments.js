function make(app, model, io) {
	app.get('/api/comment', function(req, res) {
      return model.find({ 
      	  topicid: req.params.topicid,
      	  count: req.params.count,		// get the last 20?
      	  since: req.params.since		// get since?
        }, function(err, comments) {
	    if (!err) {
			res.contentType('application/json');
			console.log(req.params);
			
			// TODO:  Order by timestamp
			return res.send(comments);
	    } else {
	      return console.log(err);
	    }
	  });
	});

	app.post('/api/comment', function(req, res) {	  
	  // TODO:  Implement persistence
	  //var n = addComment(model, io, req.body);	  
	  //return res.send(n);
	});
}

module.exports.make = make;