const Brand = require("../../models").Brand;
const User = require("../../models").User;
const Profile = require("../../models").Profile;
const Role = require("../../models").Role;

/* var models = require('../../models'); */

const jwt = require("jsonwebtoken");
const ac = require("../../config/accesscontrol");

module.exports = {
  register(req, res) {
    return Brand.create(
      {
        brand_name: req.body.brand_name,
        email: req.body.email,
        address: req.body.address,
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
      .then(brand => res.status(200).send(brand))
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
            res.json({ success: true, token: "JWT " + token });
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
