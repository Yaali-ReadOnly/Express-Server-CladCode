'use strict';
module.exports = (sequelize, DataTypes) => {
  const Variant = sequelize.define('Variant', {
    brand_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    style_id: DataTypes.INTEGER,
    img_id: DataTypes.INTEGER,
    variant_name: DataTypes.STRING,
    sku: DataTypes.STRING,
    price: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    public_qr_code: DataTypes.STRING,
    hex_color_id: DataTypes.STRING,
    combination_data: DataTypes.JSON
  }, {});
  Variant.associate = function(models) {
    // associations can be defined here
  };
  return Variant;
};