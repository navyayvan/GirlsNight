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
          res.render('profile', {events: events, user: user, hobbies: hobbies})
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
        // console.log(user);
        // console.log('separation');
        // console.log(hobby);
        db.usersHobbies.create(  
            {userId: user.id, hobbyId: hobby.id}
        ).then(function() { 
          res.redirect('/profile');
        })
      })
    });
})

// app.post('rsvp/:id', function(req,res) {
    // var id = req.params.id;
    // db.user.findById(req.session.userId).then(function(user) {
    //   request(
    //     'http://api.songkick.com/api/3.0/events/'+id+'.json?apikey=MOgnRVGp6ax4p3IT',
    //     function(error, response, body) {
    //       if (!error && response.statusCode == 200) {
    //         body = JSON.parse(body);
    //         var eventData = [];
    //         if ()
    //       }
    //     }
    //    )

      //db.event.create({id:id,details.....}).then(funcion(event){
      //   user.addEvent(event).then(function(){
        //res.render/redirect/whatever
      // })
      // })
    // })
// })

module.exports = router;