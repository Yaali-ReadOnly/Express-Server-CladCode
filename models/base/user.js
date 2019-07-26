'use strict';

var bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    brand_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER
    
  }, {});
  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Brand, {
      foreignKey: 'brand_id',
      as: 'brand'
    });
    User.hasOne(models.Profile, {
      foreignKey: 'user_id',
      as: 'profile',
    });

    User.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'role'
    });

    User.hasMany(models.User_Privileges, {
      foreignKey: 'user_id',
      as: 'userprivilege'
    });
  };
  return User;
};