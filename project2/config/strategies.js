var db = require('../models');
var LocalStrategy = require('passport-local').Strategy 

module.exports = {

	serializeUser: function(user,done) {
	  done(null, user.id);
	},

	deserializeUser: function (id,done) {
	  db.user.findById(id).then(function(user) {
	    done(null, user.get());
	  }).catch(done);
		},
	// LocalStrategy: new LocalStrategy( {
	// 	usernameField: 'email'
	// }, function(email, password, done) {
	// 	db.user.find({where: {email:email}}).then(function (user) {
	// 		if (user) {
	// 			user.checkPassword(password, function (err, ) {

	// 			})
	// 		}
	// 	})
	// })
};