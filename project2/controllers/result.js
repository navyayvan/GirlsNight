var express = require("express");
var request = require('request');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/artist/:id', function(req,res) {
	var id = req.params.id;
		request(
		'http://api.songkick.com/api/3.0/artists/'+ id +'/calendar.json?apikey=MOgnRVGp6ax4p3IT',
		function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var artistEventData = body.resultsPage.results.event.map(function(artist) {
					return { eventName: artist.series.displayname, eventLocation: artist.location };
				})
				// res.render('artistresult.ejs', { artistEventData: artistEventData });
			}
			res.send(artistEventData);
		})


module.exports = router;
