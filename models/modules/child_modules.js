'use strict';
module.exports = (sequelize, DataTypes) => {
  const Child_Modules = sequelize.define('Child_Modules', {
    parent_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    access: DataTypes.BOOLEAN,
    default_access: DataTypes.BOOLEAN
  }, {});
  Child_Modules.associate = function(models) {
    // associations can be defined here
    Child_Modules.associate = function(models) {
      Child_Modules.belongsTo(models.Master_Modules, {
        foreignKey: 'parent_id'
      });
    };
  };
  return Child_Modules;
};