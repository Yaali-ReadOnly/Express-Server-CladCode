'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sty_Attribute = sequelize.define('Sty_Attribute', {
    brand_id: DataTypes.INTEGER,
    style_id: DataTypes.INTEGER,
    attribute_id: DataTypes.INTEGER,
    attribute_name: DataTypes.STRING,
    attribute_type: DataTypes.STRING
  }, {});
  Sty_Attribute.associate = function(models) {
    // associations can be defined here
    Sty_Attribute.hasMany(models.Sty_Option, {
      foreignKey: 'sa_id',
      as: 'sty_options'
    });
  };
  return Sty_Attribute;
};