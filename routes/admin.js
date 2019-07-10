const express = require('express');

const passport = require('passport');
const router = express.Router();

//Configuration files include.. 
require('../config/passport')(passport);
const ac = require('../config/accesscontrol');


//Controllers
const loginController = require('../controllers').login;
const brandController = require('../controllers').brand;
const profileController = require('../controllers').profile;
const userController = require('../controllers').user;
const roleController = require('../controllers').role;

const styleController = require('../controllers').style;
const adminController = require('../controllers').admin;
const customerController = require('../controllers').customer;

//Permission Test
const permission = ac.can('superadmin').deleteAny('user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* grandadmin Register in admin portal */
router.post('/signup', loginController.register);

/* Login at Admin portal */
router.post('/signin', adminController.login);

/* User Config  */
router.get('/api/usercompany', passport.authenticate('jwt', { session: false}), adminController.getadminCompanyDetail);
router.get('/api/userprofile', passport.authenticate('jwt', { session: false}), adminController.getadminProfileDetail);

/* dashboard */
router.get('/api/dashboard', passport.authenticate('jwt', { session: false}), adminController.getdashboardData);

/* Company Router */
router.get('/api/brand', passport.authenticate('jwt', { session: false}), adminController.getbrandList);
router.get('/api/brand/:id', passport.authenticate('jwt', { session: false}), adminController.getbrandById);

/* User Router */
router.get('/api/user', passport.authenticate('jwt', { session: false}), userController.list);
router.get('/api/user/:id', passport.authenticate('jwt', { session: false}), userController.getById);

/* Profile Router */
router.get('/api/profile', passport.authenticate('jwt', { session: false}), profileController.list);
router.get('/api/profile/:id', passport.authenticate('jwt', { session: false}), profileController.getById);

/* User Role */
router.get('/api/role', passport.authenticate('jwt', { session: false}), roleController.list);
router.get('/api/role/:id', passport.authenticate('jwt', { session: false}), roleController.getById);

/* Customer Router */
router.get('/api/customer', passport.authenticate('jwt', { session: false}), adminController.list);
router.get('/api/customer/:id', passport.authenticate('jwt', { session: false}), adminController.getcustomerById);

/* Brand Styles */
router.get('/api/style', passport.authenticate('jwt', { session: false}), styleController.list);
router.get('/api/style/:id', passport.authenticate('jwt', { session: false}), styleController.getById);

module.exports = router;