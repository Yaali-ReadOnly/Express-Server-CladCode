'use strict';
module.exports = (sequelize, DataTypes) => {
  const Private_Code = sequelize.define('Private_Code', {
    brand_id: DataTypes.INTEGER,
    variant_id: DataTypes.INTEGER,
    style_id: DataTypes.INTEGER,
    serial_no: DataTypes.INTEGER,
    private_qr_code: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Private_Code.associate = function(models) {
    // associations can be defined here
  };
  return Private_Code;
};