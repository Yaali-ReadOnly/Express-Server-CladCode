'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role_Defaultviews = sequelize.define('Role_Defaultviews', {
    role_id: DataTypes.INTEGER,
    moduleaccess_id: DataTypes.INTEGER,
    parentmodule_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    access: DataTypes.BOOLEAN,
    default_access: DataTypes.BOOLEAN
  }, {});
  Role_Defaultviews.associate = function(models) {
    // associations can be defined here
  };
  return Role_Defaultviews;
};