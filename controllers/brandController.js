const Brand = require("../models").Brand;
const User = require("../models").User;
const Role = require("../models").Role;
const Profile = require("../models").Profile;

const ac = require("../config/accesscontrol");

module.exports = {
  list(req, res) {
    var token = getToken(req.headers);
    const permission = ac.can(req.user.role.role_name).readAny("user");

    if (token && permission.granted) {
      return Brand.findAll({
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
        .then(brands => res.status(200).send(brands))
        .catch(error => {
          res.status(400).send(error);
        });
    }
  },

  getById(req, res) {
    return Brand.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "users"
        }
      ]
    })
      .then(brand => {
        if (!brand) {
          return res.status(404).send({
            message: "Brand Not Found"
          });
        }
        return res.status(200).send(brand);
      })
      .catch(error => res.status(400).send(error));
  },

  /* add(req, res) {
    return Brand
      .create({
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        company_city: req.body.company_city,
      })
      .then((company) => res.status(201).send(company))
      .catch((error) => res.status(400).send(error));
  },

  addWithBranches(req, res) {
    console.log(req.body);
    return Brand
      .create({
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        company_city: req.body.company_city,
        branches: req.body.branches,
      }, {
          include: [{
          model: Branch,
          as: 'branches'
        }]
      })
      .then((company) => res.status(201).send(company))
      .catch((error) => res.status(400).send(error));
  }, */

  update(req, res) {
    console.log(req.body);
    return Brand.findByPk(req.params.id)
      .then(brand => {
        if (!brand) {
          return res.status(404).send({
            message: "Brand Not Found"
          });
        }
        return brand.update({
          brand_name: req.body.brand_name || brand.brand_name
        })
          .then(() => res.status(200).send(brand))
          .catch(error => {
            console.log(error);
            res.status(400).send(error);
          });
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  delete(req, res) {
    return Brand.findById(req.params.id)
      .then(company => {
        if (!company) {
          return res.status(400).send({
            message: "Company Not Found"
          });
        }
        return Brand.destroy()
          .then(() => res.status(204).send())
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
