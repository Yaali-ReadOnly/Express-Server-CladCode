'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DefaultViews = require('../data/roles/roleDefaultviews.json').views;
    let viewsArray = []
    DefaultViews.forEach((modules) => {
      viewsArray.push({

        role_id: modules['role_id'],
        moduleaccess_id: modules['moduleaccess_id'],
        parentmodule_id: modules['parentmodule_id'],
        name: modules['name'],    
        type: modules['type'],
        access: modules['access'],
        default_access: modules['default_access'],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('Role_Defaultviews', viewsArray);
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
