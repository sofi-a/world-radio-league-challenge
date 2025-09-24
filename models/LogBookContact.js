'use strict';
const { Model, Op } = require('sequelize');
const { MODEL_NAMES } = require('../CONST');

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns {import('sequelize').Model}
 */
module.exports = (sequelize, DataTypes) => {
  class LogBookContact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models[MODEL_NAMES.LOG_BOOK], {
        foreignKey: 'logBookId',
        as: 'logBook',
      });
      this.belongsTo(models[MODEL_NAMES.USER_PROFILE], {
        foreignKey: 'userId',
        as: 'user',
      });
    }

    static findContacts({
      userId,
      searchTerm = '',
      page = 1,
      pageSize = 10,
      sortBy = 'date',
      sortOrder = 'DESC',
    }) {
      return this.findAndCountAll({
        where: {
          ...(userId ? { userId } : {}),
          ...(searchTerm
            ? {
                [Op.or]: [
                  { myName: { [Op.iLike]: `%${searchTerm}%` } },
                  { theirName: { [Op.iLike]: `%${searchTerm}%` } },
                  { myCallSign: { [Op.iLike]: `%${searchTerm}%` } },
                  { theirCallSign: { [Op.iLike]: `%${searchTerm}%` } },
                ],
              }
            : {}),
        },
        order: [[sortBy, sortOrder]],
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
    }
  }
  LogBookContact.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      frequency: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      mode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      band: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      distance: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      rstSent: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rstReceived: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      myName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      theirName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      myProfilePic: {
        type: DataTypes.STRING(2048),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      theirProfilePic: {
        type: DataTypes.STRING(2048),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      myCallSign: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      theirCallSign: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      myCoordinates: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      theirCoordinates: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      myCountry: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      theirCountry: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      myCity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      theirCity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      myState: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      theirState: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      myAntenna: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      myRadio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      logBookId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: MODEL_NAMES.LOG_BOOK_CONTACT,
    }
  );
  return LogBookContact;
};
