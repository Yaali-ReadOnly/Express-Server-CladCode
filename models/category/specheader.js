'use strict';
module.exports = (sequelize, DataTypes) => {
  const SpecHeader = sequelize.define('SpecHeader', {
    brand_id: DataTypes.INTEGER,
    header_name: DataTypes.STRING,
    values: DataTypes.STRING
  }, {});
  SpecHeader.associate = function(models) {
    // associations can be defined here
  };
  return SpecHeader;
};