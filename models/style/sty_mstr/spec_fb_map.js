'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spec_Fb_Map = sequelize.define('Spec_Fb_Map', {
    sg_id: DataTypes.INTEGER,
    fb_id: DataTypes.INTEGER,
    fb_name: DataTypes.STRING,
    is_visible: DataTypes.BOOLEAN
  }, {});
  Spec_Fb_Map.associate = function(models) {
    // associations can be defined here
    Spec_Fb_Map.hasMany(models.Spec_Measurement, {
      foreignKey: 's_fb_id',
      as: 'spec_measurements'
    });
  };
  return Spec_Fb_Map;
};