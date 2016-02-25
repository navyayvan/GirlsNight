'use strict';
module.exports = function(sequelize, DataTypes) {
  var artist = sequelize.define('artist', {
    artist: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.artist.belongsToMany(models.event, {through: 'artistsEvents'})
      }
    }
  });
  return artist;
};