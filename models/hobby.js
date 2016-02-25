'use strict';
module.exports = function(sequelize, DataTypes) {
  var hobby = sequelize.define('hobby', {
    hobby: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.hobby.belongsToMany(models.user, {through: 'usersHobbys'})
      }
    }
  });
  return hobby;
};