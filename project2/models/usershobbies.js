'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersHobbies = sequelize.define('usersHobbies', {
    userId: DataTypes.INTEGER,
    hobbyId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersHobbies;
};