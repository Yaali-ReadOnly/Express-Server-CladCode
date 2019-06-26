'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cat_Option = sequelize.define('Cat_Option', {
    category_id: DataTypes.INTEGER,
    attribute_id: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    option_name: DataTypes.STRING,
    is_sub_value: DataTypes.BOOLEAN,
    option_type: DataTypes.STRING
  }, {});
  Cat_Option.associate = function(models) {
    // associations can be defined here
  };
  return Cat_Option;
};