const Brand = require("../../models").Brand;
const Style = require("../../models").Style;
const User = require("../../models").User;
const Profile = require("../../models").Profile;
const Role = require("../../models").Role;
const Customers = require("../../models").Customers;
const customerProfile = require("../../models").customerProfile;

const jwt = require("jsonwebtoken");
const ac = require("../../config/accesscontrol");

var _ = require("lodash");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {

  login(req, res) {
    if(req.body.username == 'admin@cladcode.com')
    {
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
            jwt.verify(token, "nodeauthsecret", function(err, data) { });
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
    }else
    {
      res.json({ success: false, error: 'Authentication failed. Wrong email.' });
    }
  },

  getdashboardData(req,res){
    res.status(200).send("No data available");
  },

  //get all customers list with & without pagination request
  list(req, res) {
    //console.log(req.body);
    var token = getToken(req.headers);
    const permission = ac.can(req.user.role.role_name).readAny("user");

    if (token && permission.granted) {

    // without pagination  
      // return Customers.findAll({
      //   attributes: { exclude: ['password'] },
      //   include: [
      //     {
      //       model: customerProfile,
      //       as: "customerProfile"
      //     }
      //   ]
      // })
      //   .then(customers => {
      //     let pages = Math.ceil(customers.count / limit);
      //     res
      //         .status(200)
      //         .json({ result: customers, count: customers.count, pages: pages });
      //   })
      //   .catch(error => {
      //     res.status(400).send(error);
      //   });

    // with pagination
      let limit = req.query.limit; // number of records per page
      let offset = 0;
      Customers
        .findAndCountAll()
        .then(data => {
          let page = req.query.page; // page number
          let pages = Math.ceil(data.count / limit);
          offset = limit * (page - 1);
          Customers
            .findAll({
              //attributes: ["id", "username", "createdAt", "updatedAt"],
              attributes: { exclude: ['password'] },
              limit: limit,
              offset: offset,
              $sort: { id: 1 },
              include: [
                    {
                      model: customerProfile,
                      as: "customerProfile"
                    }
                  ]
            })
            .then(customers => {
              res
                .status(200)
                .json({ result: customers, count: data.count, pages: pages });
            });
        })
        .catch(function(error) {
          res.status(500).send("Internal Server Error");
        });
    }
  },

  //get admin configuration
    getadminCompanyDetail(req, res){
        //console.log('server hits - ' ,req.user.brand_id);
        Brand.findByPk(req.user.brand_id, {
              include: [
                {
                  model: User,
                  as: "users",
                  include: [
                    {
                      model: Role,
                      as: "role"
                    },
                    {
                      model: Profile,
                      as: "profile"
                    }
                  ]
                }
              ]
          })
          .then(brand => {
            //console.log('success- ' ,req.user.brand_id);
            //console.log('full values', brand);
            if (!brand) {
              return res.status(404).send({
                message: "Brand Not Found"
              });
            }
            //return res.status(200).send({ success: true,company_detail:{brand_name: brand.dataValues.brand_name ,address: brand.users[0].profile }});
            return res.status(200).send({ success: true,company_detail:{brand_name: brand.dataValues.brand_name,brand_id:brand.id, phone:brand.phone,address: brand.address}});
          })
          .catch(error => 
            res.status(400).send(error));
    },

    //get admin profile details
    getadminProfileDetail(req, res){
      //console.log('server hits - ' ,req.user.brand_id);
      Brand.findByPk(req.user.brand_id, {
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
        })
        .then(profile => {
          //console.log('success- ' ,req.user.user_id);
          //console.log('full values', profile);
          if (!profile) {
            return res.status(404).send({
              message: "profile Not Found"
            });
          }

          //return res.status(200).send({ success: true,company_detail:{brand_name: profile.dataValues.brand_name,profile: profile}});
          return res.status(200).send({ success: true,company_detail:{brand_name: profile.dataValues.brand_name,brand_id:profile.id, email:profile.email,user:profile.users[0]}});
        })
        .catch(error => 
          res.status(400).send(error));
    },

    //get specific customer detail
    getcustomerById(req, res) {
      //console.log('cust cont ',req);
        return Customers.findByPk(req.params.id,{
          attributes: { exclude: ['password'] },
          include: [
            {
              model: customerProfile,
              as: "customerProfile"
            }
          ]
        })
        .then((customer) => {
          if (!customer) {
            return res.status(404).send({
              message: 'Customer Not Found',
            });
          }
          return res.status(200).send(customer);
        })
        .catch((error) => res.status(400).send(error));
    },

    //get brands total list - brands list page
    getbrandList(req, res) {
      //console.log(req.body);
      var token = getToken(req.headers);
      const permission = ac.can(req.user.role.role_name).readAny("user");
  
      if (token && permission.granted) {
        let limit = req.query.limit; // number of records per page
        let offset = 0;
        Brand
          .findAndCountAll({where: {
              id: {
                [Op.ne]: 1
              }
            }})
          .then(data => {
            let page = req.query.page; // page number
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            Brand
              .findAll({
                limit: limit,
                offset: offset,
                $sort: { id: 1 },
                where: {
                  id: {
                    [Op.ne]: 1
                  }
                },
                include: [
                  {
                    attributes: { exclude: ['password'] },
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
              })
              .then(customers => {
                res
                  .status(200)
                  .json({ result: customers, count: data.count, pages: pages });
              });
          })
          .catch(function(error) {
            res.status(500).send("Internal Server Error");
          });
      }
    },

    //get brand details - brands details page
    getbrandById(req, res) {
      return Promise.all([
        //return Brand.findByPk(req.params.id, {
        Brand.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: "users",
            include: [
              {
                model: Role,
                as: "role"
              },
              {
                model: Profile,
                as: "profile"
              }
            ]
          }
        ]
      }),
      Style.findAndCountAll({
        where: { brand_id: req.params.id }
      })
    ])
        .then(brand => {
          if (!brand) {
            return res.status(404).send({
              message: "Brand Not Found"
            });
          }

          const returnObj = _.zipObjectDeep(["brand", "stylecount"], [brand[0], brand[1]]);
          
          return res.status(200).send(returnObj);      
          // res.status(200).send({
          //   data: { response: { brand: brand } },
          //   status: "success"
          // })
        })
        .catch(error => res.status(400).send(error));
    },

    //update admin profile details
    updateadminProfileDetail(req, res) {
      return Brand.findByPk(req.params.id)
        .then(brand => {
          if (!brand) {
            return res.status(404).send({
              message: "Brand Not Found"
            });
          }
          return brand
            .update({
              brand_name: req.body.brand_name || brand.brand_name,
              phone: req.body.phone || brand.phone,
              address: req.body.address || brand.address
            })
            .then((brand) => res.status(200).send(brand))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
};


getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};