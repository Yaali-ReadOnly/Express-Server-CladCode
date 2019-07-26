'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChildComponents = sequelize.define('ChildComponents', {
    parent_id: DataTypes.INTEGER,
    child_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    access: DataTypes.BOOLEAN,
    view: DataTypes.BOOLEAN,
    create: DataTypes.BOOLEAN,
    edit: DataTypes.BOOLEAN,
    delete: DataTypes.BOOLEAN,
    all: DataTypes.BOOLEAN,
    type: DataTypes.STRING 
  }, {});
  ChildComponents.associate = function(models) {
    // associations can be defined here
    ChildComponents.belongsTo(models.Child_Modules, {
      foreignKey: 'child_id'
    });
    ChildComponents.belongsTo(models.Master_Modules, {
      foreignKey: 'parent_id'
    });
  };
  return ChildComponents;
};