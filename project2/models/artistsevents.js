'use strict';
module.exports = function(sequelize, DataTypes) {
  var artistsEvents = sequelize.define('artistsEvents', {
    artistId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return artistsEvents;
};