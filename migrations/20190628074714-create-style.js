'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Styles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brand_id: {
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      collection_id: {
        type: Sequelize.INTEGER
      },
      washcare_id: {
        type: Sequelize.INTEGER
      },
      spec_header_id: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      style_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      style_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      season: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      attributes: {
        type: Sequelize.JSON
      },
      spec_combinations: {
        type: Sequelize.JSON
      },
      variant_combinations: {
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
    return queryInterface.dropTable('Styles');
  }
};