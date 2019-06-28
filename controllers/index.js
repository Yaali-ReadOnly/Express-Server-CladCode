const login = require('./base/loginController');
const brand = require('./base/brandController');
const profile = require('./base/profileController');
const role = require('./base/roleController');
const user = require('./base/userController');

const category = require('./category/categoryController');



module.exports = {
  brand,
  login,
  profile,
  role,
  user,
  category
};