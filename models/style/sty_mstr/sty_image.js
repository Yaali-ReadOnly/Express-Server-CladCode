'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sty_Image = sequelize.define('Sty_Image', {
    brand_id: DataTypes.INTEGER,
    variant_id: DataTypes.INTEGER,
    style_id: DataTypes.INTEGER,
    img_urls: DataTypes.JSON
  }, {});
  Sty_Image.associate = function(models) {
    // associations can be defined here
  };
  return Sty_Image;
};