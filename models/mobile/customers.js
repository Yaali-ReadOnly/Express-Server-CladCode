'use strict';

var bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('Customers', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  Customers.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  Customers.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };

  Customers.associate = function(models) {
    // associations can be defined here
    Customers.hasOne(models.customerProfile, {
      foreignKey: 'user_id',
      as: 'customerProfile',
    });
  };
  return Customers;
};
