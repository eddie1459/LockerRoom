function make(app, model, io) {
	app.get('/api/topic', function(req, res) {
		var teamid = req.query["teamid"];
		console.log("teamid: " + teamid);
      return model.find({ 
      	  teamid: teamid
        }, function(err, topics) {
	    if (!err) {
			res.contentType('application/json');
			
			// TODO:  Order by timestamp
			return res.send(topics);
	    } else {
	      return console.log(err);
	    }
	  });
	});

	// create (not update)
	app.post('/api/topic', function(req, res) {	  
	  console.log("POST REACHED!");
	  addTopic(model, io, req.body, function(r) {
	  	res.send(r);
	  });	  
	});

	// update (technically this should create if not found)
	app.put('/api/topic/:id', function(req, res) {
		return model.findById(req.params.id, function(err, t) {
		  t.teamid = req.body.teamid;
		  t.name = req.body.name;
		  t.timestamp = Date.now();
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

	app.delete('/api/topic/:id', function(req, res) {
		return model.findById(req.params.id, function(err, t) {
		  return t.remove(function(err) {
		  	if (!err) {
		  		console.log("deleted");
		  	} else {
		  		console.log(err);
		  	}
		  	return res.send(t);
		  });
		});
	});
}

function addTopic(model, io, data, result) {
	console.log("Topic posted: ");
	console.log(data);

	var t = new model({
		teamid: data.teamid,
		name: data.name
	});
	t.save(function(err, t3) {
		if (!err) {
			io.sockets.clients().forEach(function (socket) {
		 		socket.broadcast.emit('topics-' + data.teamid, t2);
		  	});
		  	console.log(t3);
		  	result(t3);
		} else {
			console.log(err);
			result(err);
		}
	});
}

module.exports.make = make;
module.exports.addTopic = addTopic;