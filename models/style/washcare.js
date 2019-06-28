'use strict';
module.exports = (sequelize, DataTypes) => {
  const Washcare = sequelize.define('Washcare', {
    wc_name: DataTypes.STRING,
    wc_desc: DataTypes.STRING
  }, {});
  Washcare.associate = function(models) {
    // associations can be defined here
  };
  return Washcare;
};