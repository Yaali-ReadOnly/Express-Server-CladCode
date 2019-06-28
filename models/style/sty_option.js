'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sty_Option = sequelize.define('Sty_Option', {
    brand_id: DataTypes.INTEGER,
    style_id: DataTypes.INTEGER,
    sa_id: DataTypes.INTEGER,
    option_id: DataTypes.INTEGER,
    option_values: DataTypes.JSON,
    sub_values: DataTypes.JSON
  }, {});
  Sty_Option.associate = function(models) {
    // associations can be defined here
  };
  return Sty_Option;
};