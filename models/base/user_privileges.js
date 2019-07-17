'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Privileges = sequelize.define('User_Privileges', {
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    parentmodule_id: DataTypes.INTEGER,
    childmodule_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    access: DataTypes.BOOLEAN,
    default_access: DataTypes.BOOLEAN,
    type: DataTypes.STRING
  }, {});
  User_Privileges.associate = function(models) {
    // associations can be defined here
  };
  return User_Privileges;
};