var express = require("express");
var request = require('request');
var router = express.Router();
var db = require ('../models');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req,res) { 
    console.log(req.session.userId);
     db.user.findById(req.session.userId).then(function(user) {
      user.getEvents().then(function(events){
        user.getHobbies().then(function(hobbies) {
          res.render('profile', {events: events, user: user, hobbies: hobbies});
          // res.send(hobbies);
        })
      })
    })
});


router.post('/hobby', function(req,res) {
    var hobby = req.body.hobby;
    db.user.findById(req.session.userId).then(function(user) {
      db.hobby.findOrCreate( 
        { where: {hobby: hobby}})
      .spread(function(hobby) {
        db.usersHobbies.create(  
            {userId: user.id, hobbyId: hobby.id}
        ).then(function() { 
          res.redirect('/profile');
        })
      })
    });
});

    

module.exports = router;