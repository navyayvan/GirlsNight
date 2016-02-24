'use strict';

var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Your password should between 8 and 99 characters'
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        models.user.belongsToMany(models.hobby, {through: 'usersHobbies'}),
        models.user.belongsToMany(models.event, {through: 'usersEvents'})
      },
      authenticate: function(email, password, callback) {
        this.find({
          where: {email: email}
        }).then(function(user) {
          if (!user) callback(null, false);
          bcrypt.compare(password, user.password, function(err, result) {
            if (err) return callback(err);
            callback(null, result ? user : false);
          });
        }).catch(callback);
      }
    },
    hooks: {
      beforeCreate: function(user, options, callback) {
        if (user.password) {
          bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) return callback(err);
            user.password = hash;
            callback(null, user);
          });
        } else {
          callback(null, user);
        }
      }
    }
  });
  return user;
};