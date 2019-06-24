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
        role_name: {
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
      })
      .then(() => {
        return queryInterface.bulkInsert("Roles", [
          {
            role_name: "superadmin",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            role_name: "admin",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]);
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Roles");
  }
};
