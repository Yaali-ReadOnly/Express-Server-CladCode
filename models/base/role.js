'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role_name: DataTypes.STRING,
    portal_type: DataTypes.STRING,
    views: DataTypes.JSON
  }, {});

  
  Role.associate = function(models) {
    // associations can be defined here
    Role.hasMany(models.User, {
      foreignKey: 'role_id',
      as: 'users'
    });
  };
  return Role;
};