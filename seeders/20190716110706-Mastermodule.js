'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DefaultModules = require('../data/roles/moduleMaster.json').modules;
    let moduleArray = []
    DefaultModules.forEach((modules) => {
      moduleArray.push({
        name: modules['name'],
        type: modules['type'],
        default_access: modules['default_access'],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('Master_Modules', moduleArray);
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
