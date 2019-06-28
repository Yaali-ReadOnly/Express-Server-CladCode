'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spec_Gradient = sequelize.define('Spec_Gradient', {
    brand_id: DataTypes.INTEGER,
    variant_id: DataTypes.INTEGER,
    style_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    spec_combination: DataTypes.JSON,
    header: DataTypes.JSON
  }, {});
  Spec_Gradient.associate = function(models) {
    // associations can be defined here
  };
  return Spec_Gradient;
};