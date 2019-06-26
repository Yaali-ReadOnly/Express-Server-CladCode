'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cat_Alias = sequelize.define('Cat_Alias', {
    category_id: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    category_display_name: DataTypes.STRING
  }, {});
  Cat_Alias.associate = function(models) {
    // associations can be defined here
  };
  return Cat_Alias;
};