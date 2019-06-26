'use strict';
module.exports = (sequelize, DataTypes) => {
  const FB_Alias = sequelize.define('FB_Alias', {
    fb_id: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    fb_display_name: DataTypes.STRING
  }, {});
  FB_Alias.associate = function(models) {
    // associations can be defined here
  };
  return FB_Alias;
};