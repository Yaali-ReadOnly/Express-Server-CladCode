const login = require('./loginController');
const brand = require('./brandController');
const profile = require('./profileController');
const role = require('./roleController');
const user = require('./userController');


module.exports = {
  brand,
  login,
  profile,
  role,
  user,
};