"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Roles", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        brand_id: {
          type: Sequelize.INTEGER
        },
        portal_type:{
          type: Sequelize.STRING
        },
        role_name: {
          type: Sequelize.STRING
        },
        views: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }).then(() => {
       /*  const DefaultRoles = require('../data/roles/roles.json').roles;
        let rolesArray = [];
        
        DefaultRoles.forEach((role) => {
          rolesArray.push({
            role_name: role['role_name'],
            createdAt: new Date(),
            updatedAt: new Date()
          })
        });

        return queryInterface.bulkInsert('Roles', rolesArray); */
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Roles");
  }
};
