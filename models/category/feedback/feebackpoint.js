'use strict';
module.exports = (sequelize, DataTypes) => {
  const FeebackPoint = sequelize.define('FeebackPoint', {
    category_id: DataTypes.INTEGER,
    fb_point: DataTypes.STRING
  }, {});
  FeebackPoint.associate = function(models) {
    // associations can be defined here

    FeebackPoint.hasMany(models.FB_Option_Map, {
      foreignKey: 'fb_id',
      as: 'fb_maps'
    });


  };
  return FeebackPoint;
};