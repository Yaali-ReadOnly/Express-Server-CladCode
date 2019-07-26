'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Privileges = sequelize.define('User_Privileges', {
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    parentmodule_id: DataTypes.INTEGER,
    childmodule_id: DataTypes.INTEGER,
    moduleaccess_id: DataTypes.INTEGER,  
    tab_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    access: DataTypes.BOOLEAN,
    default_access: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    view: DataTypes.BOOLEAN,
    create: DataTypes.BOOLEAN,
    edit: DataTypes.BOOLEAN,
    delete: DataTypes.BOOLEAN,
    all: DataTypes.BOOLEAN,
  }, {});
  User_Privileges.associate = function(models) {
    // associations can be defined here
    User_Privileges.associate = function(models) {
      User.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    };
    User_Privileges.hasMany(models.UserAccessTabs, {
      foreignKey: 'usertabview_id',
      as: 'useraccesstabs'
    });
    User_Privileges.hasMany(models.UserAccessTabs, {
      foreignKey: 'user_id',
      as: 'useraccesstab'
    });
  };
  return User_Privileges;
};