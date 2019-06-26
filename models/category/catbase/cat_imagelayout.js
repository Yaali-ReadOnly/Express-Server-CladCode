'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cat_ImageLayout = sequelize.define('Cat_ImageLayout', {
    category_id: DataTypes.INTEGER,
    img_url: DataTypes.STRING
  }, {});
  Cat_ImageLayout.associate = function(models) {
    // associations can be defined here
  };
  return Cat_ImageLayout;
};