'use strict';
module.exports = (sequelize, DataTypes) => {
  const Style = sequelize.define('Style', {
    brand_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    collection_id: DataTypes.INTEGER,
    washcare_id: DataTypes.INTEGER,
    creator_user_id: DataTypes.INTEGER,
    style_name: DataTypes.STRING,
    style_code: DataTypes.STRING,
    season: DataTypes.STRING,
    description: DataTypes.STRING,
    attributes: DataTypes.JSON,
    spec_combinations: DataTypes.JSON,
    variant_combinations: DataTypes.JSON,
    spec_header: DataTypes.JSON
  }, {});
  Style.associate = function(models) {
    // associations can be defined here
  };
  return Style;
};