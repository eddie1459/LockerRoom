function make(app, model, io) {
	app.get('/api/team', function(req, res) {
	  var stateid = req.query["stateid"];
      var sportid = req.query["sportid"];

      console.log("User Id: ", req.user);
      console.log("Request url: " + req.url);
      console.log("stateid: " + stateid);
      console.log("sportid: " + sportid);

      return model.find({ 
      	  stateid: stateid,
      	  sportid: sportid
        }, function(err, teams) {
	    if (!err) {
			res.contentType('application/json');
			console.log(req.params);
			console.log(teams);
			return res.send(teams);
	    } else {
	      return console.log(err);
	    }
	  });
	});
}

module.exports.make = make;