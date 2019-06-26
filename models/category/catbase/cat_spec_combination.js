'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cat_Spec_Combination = sequelize.define('Cat_Spec_Combination', {
    category_id: DataTypes.INTEGER,
    imglayout_id: DataTypes.INTEGER,
    combination_name: DataTypes.STRING
  }, {});
  Cat_Spec_Combination.associate = function(models) {
    // associations can be defined here
  };
  return Cat_Spec_Combination;
};