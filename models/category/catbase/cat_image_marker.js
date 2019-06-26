'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cat_Image_Marker = sequelize.define('Cat_Image_Marker', {
    sc_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    fb_id: DataTypes.INTEGER,
    imglayout_id: DataTypes.INTEGER,
    x_value: DataTypes.STRING,
    y_value: DataTypes.STRING
  }, {});
  Cat_Image_Marker.associate = function(models) {
    // associations can be defined here
  };
  return Cat_Image_Marker;
};