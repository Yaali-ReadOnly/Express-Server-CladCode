'use strict';
module.exports = (sequelize, DataTypes) => {
  const customerProfile = sequelize.define('customerProfile', {
    user_id: DataTypes.INTEGER,
    full_name: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    gender: DataTypes.STRING,
    position: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    profile_pic: DataTypes.STRING,
    address_line1: DataTypes.STRING,
    address_line2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  customerProfile.associate = function(models) {
    // associations can be defined here
  };
  return customerProfile;
};