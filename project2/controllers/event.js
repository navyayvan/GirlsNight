var express = require("express");
var request = require('request');
var router = express.Router();
var db = require ('../models');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));


router.get('/:id', function(req,res) {
	var id = req.params.id;
	db.event.find( {where:
		{api_id: id}
	}).then(function(event){
		event.getUsers({include: [db.hobby]}).then(function(user) {
			res.render('event.ejs', {
				event: event,
				user: user,
			});
		});
	});

})

module.exports = router;