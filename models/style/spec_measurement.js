'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spec_Measurement = sequelize.define('Spec_Measurement', {
    brand_id: DataTypes.INTEGER,
    variant_id: DataTypes.INTEGER,
    style_id: DataTypes.INTEGER,
    sg_id: DataTypes.INTEGER,
    fb_id: DataTypes.INTEGER,
    option_id: DataTypes.INTEGER,
    meas_value: DataTypes.STRING
  }, {});
  Spec_Measurement.associate = function(models) {
    // associations can be defined here
  };
  return Spec_Measurement;
};