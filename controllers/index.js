const login = require('./base/loginController');
const brand = require('./base/brandController');
const profile = require('./base/profileController');
const role = require('./base/roleController');
const user = require('./base/userController');

const category = require('./category/categoryController');

const style = require('./style/styleController');


module.exports = {
  brand,
  login,
  profile,
  role,
  user,
  category,
  style
};