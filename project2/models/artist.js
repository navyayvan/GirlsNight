'use strict';
module.exports = function(sequelize, DataTypes) {
  var artist = sequelize.define('artist', {
    artist: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return artist;
};