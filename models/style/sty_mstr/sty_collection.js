'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sty_Collection = sequelize.define('Sty_Collection', {
    brand_id: DataTypes.INTEGER,
    created_user_id: DataTypes.INTEGER,
    collection_name: DataTypes.STRING
  }, {});
  Sty_Collection.associate = function(models) {
    // associations can be defined here
  };
  return Sty_Collection;
};