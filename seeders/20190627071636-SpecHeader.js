'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const CommonHeaders = require('../data/common/specHeader.json').headerdata;
    let headersArray = []
    CommonHeaders.forEach((header) => {
      headersArray.push({
        header_name: header['header_name'],
        values: JSON.stringify(header['values']),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('SpecHeaders', headersArray);
  },

  down: (queryInterface, Sequelize) => {
    //return queryInterface.bulkDelete('SpecHeaders', null);
  }
};
