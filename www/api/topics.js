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

	app.post('/api/topic', function(req, res) {	  
	  console.log("POST REACHED!");
	  var t = addTopic(model, io, req.body);	  
	  return res.send(t);
	});
}

function addTopic(model, io, data) {
	console.log("Topic posted: ");
	console.log(data);

	var t = new model({
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