'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    brand_name: DataTypes.STRING,
    email: DataTypes.STRING/* ,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    plan_id: DataTypes.INTEGER,
    logo: DataTypes.STRING */
  }, {});
  Brand.associate = function(models) {
    // associations can be defined here
    Brand.hasMany(models.User, {
      foreignKey: 'brand_id',
      as: 'users'
    });
   
  };
  return Brand;
};