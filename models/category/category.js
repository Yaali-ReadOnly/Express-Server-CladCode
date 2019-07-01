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
    Category.belongsTo(models.ParentCategory, {
      foreignKey: 'parent_id',
      as: 'parent_category'
    });

    Category.belongsTo(models.GroupCategory, {
      foreignKey: 'group_id',
      as: 'group_category'
    });

    Category.belongsTo(models.SpecHeader, {
      foreignKey: 'header_id',
      as: 'spec_header'
    });

    Category.hasMany(models.FeebackPoint, {
      foreignKey: 'category_id',
      as: 'feedbackpoints'
    });

    Category.hasMany(models.Cat_Attribute, {
      foreignKey: 'category_id',
      as: 'attributes'
    });

  };
  return Category;
};