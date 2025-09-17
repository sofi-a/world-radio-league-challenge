"use strict";

const { MODEL_NAMES, TABLE_NAMES } = require('../CONST');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      TABLE_NAMES[MODEL_NAMES.LOG_BOOK_CONTACT],
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        date: {
          allowNull: false,
          type: Sequelize.DATEONLY,
        },
        time: {
          allowNull: false,
          type: Sequelize.TIME,
        },
        frequency: {
          allowNull: true,
          type: Sequelize.FLOAT,
        },
        mode: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        band: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        grid: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        distance: {
          allowNull: true,
          type: Sequelize.FLOAT,
        },
        rstSent: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        rstReceived: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        notes: {
          allowNull: true,
          type: Sequelize.TEXT,
        },
        myName: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        theirName: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        myProfilePic: {
          allowNull: true,
          type: Sequelize.STRING(2048),
          validate: {
            isUrl: true,
          },
        },
        theirProfilePic: {
          allowNull: true,
          type: Sequelize.STRING(2048),
          validate: {
            isUrl: true,
          },
        },
        myCallSign: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        theirCallSign: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        myCoordinates: {
          allowNull: true,
          type: Sequelize.JSONB,
        },
        theirCoordinates: {
          allowNull: true,
          type: Sequelize.JSONB,
        },
        myCountry: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        theirCountry: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        myCity: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        theirCity: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        myState: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        theirState: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        myAntenna: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        myRadio: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        userId: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        logBookId: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAMES[MODEL_NAMES.LOG_BOOK_CONTACT]);
  },
};
