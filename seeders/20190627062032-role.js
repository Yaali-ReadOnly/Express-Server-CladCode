'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const DefaultRoles = require('../data/roles/roles.json').roles;
    let rolesArray = []
    DefaultRoles.forEach((role) => {
      rolesArray.push({
        role_name: role['role_name'],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('Roles', rolesArray);
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
