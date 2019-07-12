'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    user_id: DataTypes.INTEGER,
    /* brand_id: DataTypes.INTEGER, */
    fullname: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    gender: DataTypes.STRING,
    position: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    profile_pic: DataTypes.STRING,
    address: DataTypes.JSON
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
    /* Profile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    }); */
  };
  return Profile;
};