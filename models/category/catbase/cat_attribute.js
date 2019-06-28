'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cat_Attribute = sequelize.define('Cat_Attribute', {
    category_id: DataTypes.INTEGER,
    attribute_name: DataTypes.STRING,
    spec_variation: DataTypes.BOOLEAN,
    spec_image: DataTypes.BOOLEAN,
    variant_variation: DataTypes.BOOLEAN,
    variant_image: DataTypes.BOOLEAN,
    is_editable: DataTypes.BOOLEAN
  }, {});
  Cat_Attribute.associate = function(models) {
    // associations can be defined here
    Cat_Attribute.hasMany(models.Cat_Option, {
      foreignKey: 'attribute_id',
      as: 'options'
    });
  };
  return Cat_Attribute;
};