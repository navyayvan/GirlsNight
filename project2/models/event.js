'use strict';
module.exports = function(sequelize, DataTypes) {
  var event = sequelize.define('event', {
    date: DataTypes.STRING,
    venue: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return event;
};