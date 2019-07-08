'use strict';
module.exports = (sequelize, DataTypes) => {
  const Style = sequelize.define('Style', {
    brand_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    collection_id: DataTypes.INTEGER,
    washcare_id: DataTypes.INTEGER,
    spec_header_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    style_name: DataTypes.STRING,
    style_code: DataTypes.STRING,
    season: DataTypes.STRING,
    description: DataTypes.STRING,
    attributes: DataTypes.JSON,
    spec_combinations: DataTypes.JSON,
    variant_combinations: DataTypes.JSON,
    
  }, {});

 /*  Style.afterValidate((style, fn) => {
    style.brand_id = 0;
    fn(null, style)
  }) */

  Style.associate = function(models) {
    // associations can be defined here
    Style.hasMany(models.Sty_Attribute, {
      foreignKey: 'style_id',
      as: 'sty_attributes'
    });

    Style.hasMany(models.Spec_Gradient, {
      foreignKey: 'style_id',
      as: 'spec_gradient'
    });

    /* Style.hasMany(models.Sty_Option, {
      foreignKey: 'style_id',
      as: 'sty_options'
    }); */


  };
  return Style;
};