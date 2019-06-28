'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sty_Options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brand_id: {
        type: Sequelize.INTEGER
      },
      style_id: {
        type: Sequelize.INTEGER
      },
      sa_id: {
        type: Sequelize.INTEGER
      },
      option_id: {
        type: Sequelize.INTEGER
      },
      option_values: {
        type: Sequelize.JSON
      },
      sub_values: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sty_Options');
  }
};