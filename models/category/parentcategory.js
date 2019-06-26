'use strict';
module.exports = (sequelize, DataTypes) => {
  const ParentCategory = sequelize.define('ParentCategory', {
    brand_id: DataTypes.INTEGER,
    parent_name: DataTypes.STRING
  }, {});
  ParentCategory.associate = function(models) {
    // associations can be defined here
  };
  return ParentCategory;
};