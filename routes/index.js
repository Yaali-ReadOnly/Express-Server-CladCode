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

const categoryController = require('../controllers').category;

const styleController = require('../controllers').style;

const adminController = require('../controllers').admin;

//Permission Test
const permission = ac.can('superadmin').deleteAny('user');
//console.log("permission =", permission.granted);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Brand Register in WebPortal */
router.post('/signup', loginController.register);

/* Login at WebPortal */
router.post('/signin', loginController.login);

/* Company Router */
router.get('/api/brand', passport.authenticate('jwt', { session: false}), brandController.list);
router.get('/api/brand/:id', passport.authenticate('jwt', { session: false}), brandController.getById);
//router.post('/api/brand', passport.authenticate('jwt', { session: false}), brandController.add);
router.put('/api/brand/:id', passport.authenticate('jwt', { session: false}), brandController.update);
//router.delete('/api/brand/:id', passport.authenticate('jwt', { session: false}), brandController.delete);

/* User Router */
router.get('/api/user', passport.authenticate('jwt', { session: false}), userController.list);
router.get('/api/user/:id', passport.authenticate('jwt', { session: false}), userController.getById);
router.post('/api/user', passport.authenticate('jwt', { session: false}), userController.add);
router.put('/api/user/:id', passport.authenticate('jwt', { session: false}), userController.update);
router.delete('/api/user/:id', passport.authenticate('jwt', { session: false}), userController.delete);

/* Profile Router */
router.get('/api/profile', passport.authenticate('jwt', { session: false}), profileController.list);
router.get('/api/profile/:id', passport.authenticate('jwt', { session: false}), profileController.getById);
//router.post('/api/profile', passport.authenticate('jwt', { session: false}), profileController.add);
router.put('/api/profile/:id', passport.authenticate('jwt', { session: false}), profileController.update);
router.delete('/api/profile/:id', passport.authenticate('jwt', { session: false}), profileController.delete);

/* User Role */
router.get('/api/role', passport.authenticate('jwt', { session: false}), roleController.list);
router.get('/api/role/:id', passport.authenticate('jwt', { session: false}), roleController.getById);
router.post('/api/role', passport.authenticate('jwt', { session: false}), roleController.add);
router.put('/api/role/:id', passport.authenticate('jwt', { session: false}), roleController.update);
router.delete('/api/role/:id', passport.authenticate('jwt', { session: false}), roleController.delete);

/* Advance Router */
/* router.post('/api/role/add_user', roleController.addUser);
router.post('/api/company/add_with_branches', companyController.addWithBranches); */


/* Categories */
router.get('/api/categories', passport.authenticate('jwt', { session: false}), categoryController.list);
router.get('/api/categories/main', passport.authenticate('jwt', { session: false}), categoryController.getCategoryLevel);
router.get('/api/categories/:id', passport.authenticate('jwt', { session: false}), categoryController.getById);
/* router.post('/api/categories', passport.authenticate('jwt', { session: false}), categoryController.add);
router.put('/api/categories/:id', passport.authenticate('jwt', { session: false}), categoryController.update);
router.delete('/api/categories/:id', passport.authenticate('jwt', { session: false}), categoryController.delete); */

/* Brand Styles */
router.get('/api/style', passport.authenticate('jwt', { session: false}), styleController.list);
router.get('/api/style/:id', passport.authenticate('jwt', { session: false}), styleController.getById);
router.post('/api/style', passport.authenticate('jwt', { session: false}), styleController.add);
router.put('/api/style/:id', passport.authenticate('jwt', { session: false}), styleController.update);

/* 

router.get('/product', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  console.log("user ============",req.user);
  const permission = ac.can('admin').deleteAny('post');

  if (token && permission.granted) {
    Product
      .findAll()
      .then((products) => res.status(200).send(products))
      .catch((error) => { res.status(400).send(error); });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/product', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Product
      .create({
        prod_name: req.body.prod_name,
        prod_desc: req.body.prod_desc,
        prod_price: req.body.prod_price
      })
      .then((product) => res.status(201).send(product))
      .catch((error) => res.status(400).send(error));
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}; */

module.exports = router;