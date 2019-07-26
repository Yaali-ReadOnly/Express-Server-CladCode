'use strict';
module.exports = (sequelize, DataTypes) => {
  const Master_Modules = sequelize.define('Master_Modules', {
    name: DataTypes.STRING,
    notes: DataTypes.STRING,
    default_access: DataTypes.BOOLEAN
  }, {});
  Master_Modules.associate = function(models) {
    // associations can be defined here
      Master_Modules.hasMany(models.Child_Modules, {
        foreignKey: 'parent_id',
        as: 'childmodules'
      });
      Master_Modules.hasMany(models.ChildComponents, {
        foreignKey: 'parent_id',
        as: 'childcomponents'
      });
  };
  return Master_Modules;
};