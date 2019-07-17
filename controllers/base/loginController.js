const Brand = require("../../models").Brand;
const User = require("../../models").User;
const Profile = require("../../models").Profile;
const Role = require("../../models").Role;
const Role_Defaultviews = require("../../models").Role_Defaultviews;
const User_Privileges = require("../../models").User_Privileges;

/* var models = require('../../models'); */

const jwt = require("jsonwebtoken");
const ac = require("../../config/accesscontrol");
var _ = require("lodash");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  register(req, res) {
    return Brand.create(
      {
        brand_name: req.body.brand_name,
        email: req.body.email,
        address: req.body.address || {street:"",city:"",state:"",zipcode:"",country:""},
        users: req.body.users,
        phone: req.body.phone,
        profile: req.body.users.profile
      },
      {
        include: [
          {
            model: User,
            as: "users",
            include: [
              {
                model: Profile,
                as: "profile"
              }
            ]
          }
        ]
      }
    )
      .then(brand => {
          res.status(200).send(brand);
          
        //create user based privileges
          Role_Defaultviews.findAll({
            attributes: { exclude: ['createdAt','updatedAt'] },
            where: {
              role_id: brand.users[0].role_id,
              type: {
                [Op.or]: ["brand", "common"]
              },
            }
          })
          .then(privileges =>
            {
              let viewsArray = [];
              privileges.forEach((userprivileges) => {
                viewsArray.push({

                  user_id:brand.users[0].id,
                  role_id: brand.users[0].role_id,
                  parentmodule_id: userprivileges['parentmodule_id'],
                  childmodule_id: userprivileges['moduleaccess_id'],
                  name: userprivileges['name'],
                  access: userprivileges['access'],
                  default_access: userprivileges['default_access'],
                  type: userprivileges['type']
                })
              })
              User_Privileges.bulkCreate(viewsArray).then(privileges => {
                //console.log(privileges) // ... in order to get the array of user objects
              });
            })
          //user privileges ends
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },

  login(req, res) {
    User.findOne({
      where: {
        username: req.body.username
      },
      include: [
        {
          model: Role,
          as: "role"
        }
      ]
    })
      .then(user => {
        
        if (!user) {
          return res.status(401).send({
            message: "Authentication failed. User not found."
          });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
          //console.log(user);
          if (isMatch && !err) {
            var token = jwt.sign(
              JSON.parse(JSON.stringify(user)),
              "nodeauthsecret",
              { expiresIn: 86400 * 30 }
            );
            jwt.verify(token, "nodeauthsecret", function(err, data) {
              //console.log(err, data);
            });

            return Promise.all([
              User_Privileges.findAll({
                attributes: { exclude: ['createdAt','updatedAt'] },
                where: {
                  role_id: user.id,
                  type: {
                    [Op.or]: ["brand", "common"]
                  },
                }
              })
            ])
            .then(views => {
              const returnObj = _.zipObjectDeep(["success", "token", "globalconfiguration", "role"], [true, "JWT " + token, views[0], user.role]);
              
              return res.status(200).send(returnObj); 
            });

          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password."
            });
          }
        });
      })
      .catch(error => res.status(400).send(error));
  }
};
