'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    parent_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    header_id: DataTypes.INTEGER,
    category_name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};