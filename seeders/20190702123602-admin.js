'use strict';
const User = require("../models").User;
const Brand = require("../models").Brand;
const Profile = require("../models").Profile;
const Role = require("../models").Role;
module.exports = {
  up:async (queryInterface, Sequelize) => {
    let req={
      "brand_name": "CladCode",
      "email": "admin@cladcode.com",
      "phone":"9176204465",
      "address":{"street":"1st complex,velachery","city":"chennai","state":"tamilnadu","zipcode":"600041","country":"india"},
      "users": [
          {
              "username": "admin@cladcode.com",
              "password": "1234",
              "profile": {
                  "fullname": "prashanth",
                  "gender": "male",      
                  "phone":"9176204465",
                  "email": "prashanth@gmail.com",
                  "address":{"street": "51st street","city": "chennai","state":"tamilnadu","country":"india","zipcode":"600041"} 
              },
              "role_id": 1
          }
      ]
    };

   return Brand.create(
        {
          brand_name: req.brand_name,
          email: req.email,
          phone: req.phone,
          address: req.address,
          users: req.users,
          profile: req.users.profile
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
      ).then(brand => console.log(brand));
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
