'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spec_Measurement = sequelize.define('Spec_Measurement', {
    s_fb_id: DataTypes.INTEGER,
    option_name: DataTypes.STRING,
    meas_value: DataTypes.STRING
  }, {});
  Spec_Measurement.associate = function(models) {
    // associations can be defined here
  };
  return Spec_Measurement;
};