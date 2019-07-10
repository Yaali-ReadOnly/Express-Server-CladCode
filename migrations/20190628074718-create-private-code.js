"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("Private_Codes", {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          brand_id: {
            type: Sequelize.INTEGER
          },
          variant_id: {
            type: Sequelize.INTEGER
          },
          style_id: {
            type: Sequelize.INTEGER
          },
          private_uuid: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          img_path: {
            type: Sequelize.STRING
          },
          status: {
            type: Sequelize.STRING
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
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Private_Codes");
  }
};
