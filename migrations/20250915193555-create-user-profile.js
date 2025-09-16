'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserProfiles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      firstName: {
        allowNull: false,
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
        type: Sequelize.STRING,
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserProfiles');
  }
};