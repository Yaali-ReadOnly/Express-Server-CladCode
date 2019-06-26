'use strict';
module.exports = (sequelize, DataTypes) => {
  const SC_Option_Map = sequelize.define('SC_Option_Map', {
    sc_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    option_id: DataTypes.INTEGER
  }, {});
  SC_Option_Map.associate = function(models) {
    // associations can be defined here
  };
  return SC_Option_Map;
};