'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role_Defaultviews = sequelize.define('Role_Defaultviews', {
    role_id: DataTypes.INTEGER,
    parentmodule_id: DataTypes.INTEGER,    
    childmodule_id: DataTypes.INTEGER,    
    moduleaccess_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    default_access: DataTypes.BOOLEAN,
    view: DataTypes.BOOLEAN,
    create: DataTypes.BOOLEAN,
    edit: DataTypes.BOOLEAN,
    delete: DataTypes.BOOLEAN,
    all: DataTypes.BOOLEAN
  }, {});
  Role_Defaultviews.associate = function(models) {
    // associations can be defined here
      Role_Defaultviews.hasMany(models.RoleAccessTabs, {
        foreignKey: 'roledefaultview_id',
        as: 'roleaccesstabs'
      });
      Role_Defaultviews.belongsTo(models.Role, {
        foreignKey: 'role_id'
      });
  };
  return Role_Defaultviews;
};