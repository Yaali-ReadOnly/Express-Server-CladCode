const Brand = require("../../models").Brand;
const User = require("../../models").User;
const Profile = require("../../models").Profile;
const Role = require("../../models").Role;
const Role_Defaultviews = require("../../models").Role_Defaultviews;
const User_Privileges = require("../../models").User_Privileges;
const UserAccessTabs = require("../../models").UserAccessTabs;
const DefaultTabs = require('../../data/roles/tabs.json').tabs;

const fs = require("fs");

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
        address: req.body.address || {
          street: "",
          city: "",
          state: "",
          zipcode: "",
          country: ""
        },
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

        //create a images folder for brand
        const brandFolderName = "./public/images/brands/" + brand.brand_name.toLowerCase().split(' ').join('_') + "_" + brand.id;
        try {
          if (!fs.existsSync(brandFolderName)) {
            fs.mkdirSync(brandFolderName);
            fs.mkdirSync(brandFolderName + "/product");
            fs.mkdirSync(brandFolderName + "/profile");
            fs.mkdirSync(brandFolderName + "/others");
          } else {
            console.log("Already Created " + brandName);
          }
        } catch (err) {
          console.error(err);
        }

        //create user based privileges
        Role_Defaultviews.findAll({
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          where: {
            role_id: brand.users[0].role_id,
            type: {
              [Op.or]: ["brand", "common"]
            }
          }
        })
          .then(brands => {
            // const data={privileges:brands,brand:brand};
            // res.status(200).send(data);
            let viewsArray = [];
            brands.forEach((roleprivileges) => {

              return User_Privileges.create(
                {
                  user_id: brand.users[0].id,
                  role_id: brand.users[0].role_id,
                  parentmodule_id: roleprivileges['parentmodule_id'],
                  childmodule_id: roleprivileges['childmodule_id'],
                  moduleaccess_id: roleprivileges['moduleaccess_id'],
                  tab_id: roleprivileges['id'],
                  name: roleprivileges['name'],
                  access: roleprivileges['access'],
                  default_access: roleprivileges['default_access'],
                  type: roleprivileges['type'],
                  view: roleprivileges['view'],
                  create: roleprivileges['create'],
                  edit: roleprivileges['edit'],
                  delete: roleprivileges['delete'],
                  all: roleprivileges['all']
                })
                .then(userprivileges => {
                  //console.log(userprivileges);           
                })
                .catch(error => {
                  // res.status(400).send(error);
                });
            })
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
      attributes: { exclude: ["updatedAt", "createdAt"] },
      include: [
        {
          model: Role,
          as: "role",
          attributes: { exclude: ["views", "updatedAt", "createdAt"] }
        },
        {
          model: Profile,
          as: "profile"
        },
        {
          model: Brand,
          as: "brand",
          attributes: {
            exclude: ["email", "phone", "address", "updatedAt", "createdAt"]
          }
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
            //need to delete password in token
            var token = jwt.sign(
              JSON.parse(JSON.stringify(user)),
              "nodeauthsecret",
              { expiresIn: 86400 * 30 }
            );
            jwt.verify(token, "nodeauthsecret", function (err, data) {
              //console.log(err, data);
            });

            return Promise.all([
              User_Privileges.findAll({
                attributes: { exclude: ["createdAt", "updatedAt"] },
                where: {
                  user_id: user.id,
                  type: {
                    [Op.or]: ["brand", "common"]
                  }
                },
                // include:[
                //   {
                //     model: UserAccessTabs,
                //     as: 'useraccesstabs'
                //   } 
                // ]
              })
            ])
              .then(views => {
                const user_detail = {
                  user_id: user.id, brand_id: user.brand_id, role_id: user.role_id, profile_id: user.profile.id, full_name: user.profile.fullname,
                  email: user.username, role_name: user.role.role_name
                };

                //elaborated response
                // const returnObj = _.zipObjectDeep(["success", "token", "globalconfiguration", "brand", "profile", "role", "check"], [true, "JWT "+ token, views[0], user.brand, user.profile, user.role, user]);

                const returnObj = _.zipObjectDeep(["success", "token", "globalconfiguration", "user", "role"], [true, "JWT " + token, views[0], user_detail, user.role]);

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
      .catch (error => res.status(400).send(error));
  }
};
