'use strict';
module.exports = function(sequelize, DataTypes) {
  var hobby = sequelize.define('hobby', {
    hobby: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return hobby;
};