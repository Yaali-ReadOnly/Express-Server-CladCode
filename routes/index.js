const express = require('express');

const passport = require('passport');
const router = express.Router();

//Configuration files include.. 
require('../config/passport')(passport);
const ac = require('../config/accesscontrol');

//Models 
/* const Product = require('../models').Product;
const User = require('../models').User; */

//Controllers
const loginController = require('../controllers').login;
const brandController = require('../controllers').brand;
//const profileController = require('../controllers').profile;
const userController = require('../controllers').user;
//const roleController = require('../controllers').role;

//Permission Test
const permission = ac.can('superadmin').deleteAny('user');
//console.log("permission =", permission.granted);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Company Router */
router.get('/api/brand', passport.authenticate('jwt', { session: false}), brandController.list);
router.get('/api/brand/:id', passport.authenticate('jwt', { session: false}), brandController.getById);
//router.post('/api/brand', passport.authenticate('jwt', { session: false}), brandController.add);
router.put('/api/brand/:id', passport.authenticate('jwt', { session: false}), brandController.update);
//router.delete('/api/brand/:id', passport.authenticate('jwt', { session: false}), brandController.delete);

/* User Router */
router.get('/api/user',  userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

/* Branch Router */
/* router.get('/api/branch', branchController.list);
router.get('/api/branch/:id', branchController.getById);
router.post('/api/branch', branchController.add);
router.put('/api/branch/:id', branchController.update);
router.delete('/api/branch/:id', branchController.delete); */

/* Profile Router */
/* router.get('/api/profile', profileController.list);
router.get('/api/profile/:id', profileController.getById);
router.post('/api/profile', profileController.add);
router.put('/api/profile/:id', profileController.update);
router.delete('/api/profile/:id', profileController.delete); */

/* User Role */
/* router.get('/api/role', roleController.list);
router.get('/api/role/:id', roleController.getById);
router.post('/api/role', roleController.add);
router.put('/api/role/:id', roleController.update);
router.delete('/api/role/:id', roleController.delete); */

/* Advance Router */
/* router.post('/api/role/add_user', roleController.addUser);
router.post('/api/company/add_with_branches', companyController.addWithBranches); */


//signup
router.post('/signup', loginController.register);
/* router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({msg: 'Please pass username and password.'})
  } else {
    User
      .create({
        username: req.body.username,
        password: req.body.password
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  }
}); */

//signin
router.post('/signin', loginController.login);
/* router.post('/signin', function(req, res) {
  User
      .findOne({
        where: {
          username: req.body.username
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'Authentication failed. User not found.',
          });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
          if(isMatch && !err) {
            
            var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});
            jwt.verify(token, 'nodeauthsecret', function(err, data){
              console.log(err, data);
            })
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        })
      })
      .catch((error) => res.status(400).send(error));
}); */


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
};

module.exports = router;