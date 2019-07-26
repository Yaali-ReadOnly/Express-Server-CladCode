'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role_name: DataTypes.STRING,
    portal_type: DataTypes.STRING,
    views:{ 
          type:DataTypes.STRING,
          // get: function() {
          //     return JSON.parse(this.getDataValue('views'));
          // }, 
          set: function(val) {
              return this.setDataValue('views', JSON.stringify(val));
          }
    }
  }, {});

  
  Role.associate = function(models) {
    // associations can be defined here
    Role.hasMany(models.User, {
      foreignKey: 'role_id',
      as: 'users'
    });

    Role.hasMany(models.User_Privileges, {
      foreignKey: 'role_id',
      as: 'userprivileges'
    });

    Role.hasMany(models.Role_Defaultviews, {
      foreignKey: 'role_id',
      as: 'roleprivileges'
    });
  };
  return Role;
};