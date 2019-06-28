'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DefaultData = require('../data/common/washcare.json').washcares;
    let wcArray = []
    DefaultData.forEach((care) => {
      wcArray.push({
        wc_name: care['wc_name'],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('Washcares', wcArray);
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
