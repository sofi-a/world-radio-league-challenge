'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LogBooks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
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
    await queryInterface.dropTable('LogBooks');
  }
};