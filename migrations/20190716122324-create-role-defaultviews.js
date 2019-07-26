'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Role_Defaultviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER
      },
      moduleaccess_id: {
        type: Sequelize.INTEGER
      },
      parentmodule_id: {
        type: Sequelize.INTEGER
      },
      name:{
        type: Sequelize.STRING
      },
      childmodule_id:{
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      // access: {
      //   type: Sequelize.BOOLEAN
      // },
      default_access: {
        type: Sequelize.BOOLEAN
      },
      view: {
        type: Sequelize.BOOLEAN
      },
      create: {
        type: Sequelize.BOOLEAN
      },
      edit: {
        type: Sequelize.BOOLEAN
      },
      delete: {
        type: Sequelize.BOOLEAN
      },
      all: {
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
    return queryInterface.dropTable('Role_Defaultviews');
  }
};