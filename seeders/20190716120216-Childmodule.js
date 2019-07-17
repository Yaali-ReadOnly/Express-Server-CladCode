'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DefaultModules = require('../data/roles/moduleChild.json').modules;
    let moduleArray = []
    DefaultModules.forEach((modules) => {
      moduleArray.push({
        parent_id: modules['parent_id'],
        name: modules['name'],
        access: modules['access'],
        default_access: modules['default_access'],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('Child_Modules', moduleArray);
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
