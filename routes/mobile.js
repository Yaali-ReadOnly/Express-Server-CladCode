const express = require('express');

const passport = require('passport');
const router = express.Router();

//Configuration files include.. 
require('../config/passport')(passport);
const ac = require('../config/accesscontrol');


//Controllers
const loginController = require('../controllers').custlogin;
// const profileController = require('../controllers').customerprofile;
const customerController = require('../controllers').customer;

//Permission Test
const permission = ac.can('superadmin').deleteAny('user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* customer register from mobile */
router.post('/signup', loginController.register);

/* Login at mobile */
//router.post('/signin', loginController.login);

module.exports = router;