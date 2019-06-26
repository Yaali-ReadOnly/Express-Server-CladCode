'use strict';
module.exports = (sequelize, DataTypes) => {
  const FB_Option_Map = sequelize.define('FB_Option_Map', {
    fb_id: DataTypes.INTEGER,
    option_id: DataTypes.INTEGER,
    is_visible: DataTypes.BOOLEAN
  }, {});
  FB_Option_Map.associate = function(models) {
    // associations can be defined here
  };
  return FB_Option_Map;
};