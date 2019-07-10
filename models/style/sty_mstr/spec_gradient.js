'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spec_Gradient = sequelize.define('Spec_Gradient', {
    brand_id: DataTypes.INTEGER,
    style_id: DataTypes.INTEGER,
    gradient_name: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    combination_data: DataTypes.JSON,
    col_header: DataTypes.JSON
  }, {});
  Spec_Gradient.associate = function(models) {
    // associations can be defined here
    Spec_Gradient.hasMany(models.Spec_Fb_Map, {
      foreignKey: 'sg_id',
      as: 'spec_fb_maps'
    });
  };
  return Spec_Gradient;
};