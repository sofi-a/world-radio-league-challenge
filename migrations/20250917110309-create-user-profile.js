'use strict';

const { MODEL_NAMES, TABLE_NAMES } = require('../CONST');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAMES[MODEL_NAMES.USER_PROFILE], {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      firstName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      bio: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      profilePic: {
        allowNull: true,
        type: Sequelize.STRING(2048),
      },
      callSign: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true,
      },
      country: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      coordinates: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      gridSquare: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bands: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      modes: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAMES[MODEL_NAMES.USER_PROFILE]);
  },
};
