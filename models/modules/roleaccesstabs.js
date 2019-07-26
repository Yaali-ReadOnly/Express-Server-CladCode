'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoleAccessTabs = sequelize.define('RoleAccessTabs', {
    roledefaultview_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    tab_id: DataTypes.INTEGER,
    access: DataTypes.BOOLEAN,
    notes: DataTypes.STRING
  }, {});
  RoleAccessTabs.associate = function(models) {
      RoleAccessTabs.belongsTo(models.Role_Defaultviews, {
        foreignKey: 'roledefaultview_id'
      });
  };
  return RoleAccessTabs;
};