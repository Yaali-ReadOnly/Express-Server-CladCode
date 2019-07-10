'use strict';
module.exports = (sequelize, DataTypes) => {
  const Public_Code = sequelize.define('Public_Code', {
    brand_id: DataTypes.INTEGER,
    variant_id: DataTypes.INTEGER,
    public_uuid: DataTypes.UUID,
    img_path: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Public_Code.associate = function(models) {
    // associations can be defined here
    
  };
  return Public_Code;
};