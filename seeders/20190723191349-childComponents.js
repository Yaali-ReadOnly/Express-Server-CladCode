'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DefaultModules = require('../data/roles/childComponents.json').components;
    let moduleArray = []
    DefaultModules.forEach((modules) => {
      
      moduleArray.push({
        parent_id: modules['parent_id'],
        child_id: modules['child_id'],
        name: modules['name'],
        view: modules['view'],
        create: modules['create'],
        edit: modules['edit'],
        delete:modules['delete'],
        all: modules['all'],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('ChildComponents', moduleArray);
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
