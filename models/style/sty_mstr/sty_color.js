'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sty_color = sequelize.define('Sty_color', {
    brand_id: DataTypes.INTEGER,
    variant_id: DataTypes.INTEGER,
    style_id: DataTypes.INTEGER,
    hex_colors: DataTypes.JSON,
    volume: DataTypes.JSON
  }, {});
  Sty_color.associate = function(models) {
    // associations can be defined here
  };
  return Sty_color;
};