'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sty_Option = sequelize.define('Sty_Option', {
    brand_id: DataTypes.INTEGER,
    sa_id: DataTypes.INTEGER,
    option_id: DataTypes.INTEGER,
    option_name: DataTypes.STRING,
    is_sub_value: DataTypes.BOOLEAN,
    sub_values: DataTypes.JSON,
  }, {});
  Sty_Option.associate = function(models) {
    // associations can be defined here
  };
  return Sty_Option;
};