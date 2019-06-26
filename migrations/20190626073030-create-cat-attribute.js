'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cat_Attributes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      attribute_name: {
        type: Sequelize.STRING
      },
      spec_variation: {
        type: Sequelize.BOOLEAN
      },
      spec_image: {
        type: Sequelize.BOOLEAN
      },
      variant_variation: {
        type: Sequelize.BOOLEAN
      },
      variant_image: {
        type: Sequelize.BOOLEAN
      },
      is_editable: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Cat_Attributes');
  }
};