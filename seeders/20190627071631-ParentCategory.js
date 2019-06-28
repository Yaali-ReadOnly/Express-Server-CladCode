'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DefaultParents = require('../data/category/parentcategories.json').parentcategories;
    let parentsArray = []
    DefaultParents.forEach((parent) => {
      parentsArray.push({
        parent_name: parent['parent_name'],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('ParentCategories', parentsArray);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   //return queryInterface.bulkDelete('ParentCategories', null);
  }
};
