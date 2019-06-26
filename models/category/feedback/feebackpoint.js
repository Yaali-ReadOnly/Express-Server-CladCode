'use strict';
module.exports = (sequelize, DataTypes) => {
  const FeebackPoint = sequelize.define('FeebackPoint', {
    category_id: DataTypes.INTEGER,
    fb_point: DataTypes.STRING
  }, {});
  FeebackPoint.associate = function(models) {
    // associations can be defined here
  };
  return FeebackPoint;
};