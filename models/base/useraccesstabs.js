'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAccessTabs = sequelize.define('UserAccessTabs', {
    user_id: DataTypes.INTEGER,
    usertabview_id: DataTypes.INTEGER,
    tab_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    access: DataTypes.BOOLEAN,
    notes: DataTypes.STRING
  }, {});
  UserAccessTabs.associate = function(models) {
    // associations can be defined here
    UserAccessTabs.belongsTo(models.User_Privileges, {
      foreignKey: 'usertabview_id'
    });
    UserAccessTabs.belongsTo(models.User_Privileges, {
      foreignKey: 'user_id'
    });
  };
  return UserAccessTabs;
};