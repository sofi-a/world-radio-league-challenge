'use strict';

const { MODEL_NAMES, TABLE_NAMES } = require('../CONST');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAMES[MODEL_NAMES.LOG_BOOK], {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      defaultCallSign: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      coordinates: {
        allowNull: true,
        type: Sequelize.JSONB,
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      myAntenna: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      myRadio: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      contactCount: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      lastContactTimestamp: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      userId: {
        allowNull: true,
        type: Sequelize.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAMES[MODEL_NAMES.LOG_BOOK]);
  }
};