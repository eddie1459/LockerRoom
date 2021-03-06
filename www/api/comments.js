function make(app, model, io) {
	app.get('/api/comment', function(req, res) {
		var topicid = req.query["topicid"];

		console.log("topicid: " + topicid);
      return model.find({ 
      	  topicid: topicid
        }, function(err, comments) {
	    if (!err) {
			res.contentType('application/json');

			// TODO:  Order by timestamp
			return res.send(comments);
	    } else {
	      return console.log(err);
	    }
	  });
	});

	// create (not update)
	app.post('/api/comment', function(req, res) {	  
		console.log("COMMENT POST REACHED!");
	  	addComment(model, io, req.body, function(c) {
	  		res.send(c);
	 	});	  
	});

	// update (technically this should create if not found)
	app.put('/api/comment/:id', function(req, res) {
		return model.findById(req.params.id, function(err, c) {
		  c.topicid = req.body.topicid;
		  c.commentcontent = req.body.commentcontent;
		  c.timestamp = Date.now();
		  return c.save(function(err) {
		  	if (!err) {
		  		console.log("updated");
		  	} else {
		  		console.log(err);
		  	}
		  	return res.send(c);
		  });
		});
	});

	app.delete('/api/comment/:id', function(req, res) {
		return model.findById(req.params.id, function(err, c) {
		  return c.remove(function(err) {
		  	if (!err) {
		  		console.log("deleted");
		  	} else {
		  		console.log(err);
		  	}
		  	return res.send(c);
		  });
		});
	});
}

function addComment(model, io, data, result) {
	console.log("Comment posted: ");
	console.log(data);

	var c = new model({
		topicid: data.topicid,
		commentcontent: data.commentcontent
	});
	c.save(function(err, r) {
		if (!err) {
			io.sockets.clients().forEach(function (socket) {
		 		socket.broadcast.emit('comments-' + data.topicid, r);
		  	});
		  	console.log(r);
			result(r);
		} else {
			console.log(err);
			result(err);
		}
	});
}

module.exports.make = make;
module.exports.addComment = addComment;