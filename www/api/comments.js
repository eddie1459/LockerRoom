function make(app, model, io) {
	app.get('/api/comment', function(req, res) {
      return model.find({ 
      	  topicid: req.params.topicid,
      	  count: req.params.count,		// get the last 20? this is also probably not suppose to be in the find
      	  since: req.params.since		// get since? this is also probably not suppose to be in the find
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
	  var c = addComment(model, io, req.body);	  
	  return res.send(c);
	});
}

function addComment(model, io, data) {
	console.log("Topic posted: ");
	console.log(data);

	var c = new model({
		topicid: data.topicid,
		conent: data.content
	});
	c.save(function(err) {
		if (!err) {
			// TODO:  This is where socket.io comes in. We've saved the record so now we need to tell everyone!	
		} else {
			// TODO:  Report problem back to the user...
		}
	});
}

module.exports.make = make;
module.exports.addComment = addComment;