'use strict';
module.exports = function(sequelize, DataTypes) {
  var event = sequelize.define('event', {
    date: DataTypes.STRING,
    venue: DataTypes.STRING,
    location: DataTypes.STRING,
    name: DataTypes.STRING,
    api_id: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.event.belongsToMany(models.user, {through: 'usersEvents'}),
        models.event.belongsToMany(models.artist, {through: 'artistsEvents'})
      }
    }
  });
  return event;
};