function make(app, model, io) {
	app.get('/api/topic', function(req, res) {
      return model.find({ 
      	  sportid: req.params.sportid,
      	  teamid: req.params.teamid,
      	  count: req.params.count,		// get the last 20? this is also probably not suppose to be in the find
      	  since: req.params.since		// get since? this is also probably not suppose to be in the find
        }, function(err, topics) {
	    if (!err) {
			res.contentType('application/json');
			console.log(req.params);
			
			// TODO:  Order by timestamp
			return res.send(topics);
	    } else {
	      return console.log(err);
	    }
	  });
	});

	app.post('/api/topic', function(req, res) {	  
	  var t = addTopic(model, io, req.body);	  
	  return res.send(t);
	});
}

function addTopic(model, io, data) {
	console.log("Topic posted: ");
	console.log(data);

	var t = new model({
		sportid: data.sportid,
		teamid: data.teamid,
		name: data.name
	});
	t.save(function(err) {
		if (!err) {
			// TODO:  This is where socket.io comes in. We've saved the record so now we need to tell everyone!	
		} else {
			// TODO:  Report problem back to the user...
		}
	});
}

module.exports.make = make;
module.exports.addTopic = addTopic;