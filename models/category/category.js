'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    brand_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
   
  };
  return Category;
};