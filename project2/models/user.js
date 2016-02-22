var bcrypt = require('bcryptjs');

'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
    hobby: DataTypes.STRING,
    artist: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      authenticate: function(email, password, callback) {
        this.find({
          where: {email: email}
        }).then(function(user) {
          if (!user) callback(null, false);
          bcrypt.compare(password, user.password, function(err,result) {
            if (err) return callback(err);
            callback(null, result ? user: false);
          })
        }).catch(callback);
      }
    },
      instanceMethods: {
        checkPassword: function(password, callback) {
          if (password && this.password) {
            bcrypt.compare(password, this.password, callback);
          } else {
            callback(null, false);
          }
        }
      },
    hooks: {
      beforeCreate: function (user, options, callback) {
        if (user.password) {
          bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) return callback(err);
            user.password = hash;
            callback(null, user);
          });
        }
      }
    }
  });
  return user;
};