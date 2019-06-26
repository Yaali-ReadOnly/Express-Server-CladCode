'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupCategory = sequelize.define('GroupCategory', {
    brand_id: DataTypes.INTEGER,
    group_name: DataTypes.STRING,
    display_name: DataTypes.STRING
  }, {});
  GroupCategory.associate = function(models) {
    // associations can be defined here
  };
  return GroupCategory;
};