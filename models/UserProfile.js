'use strict';
const { Model } = require('sequelize');
const { MODEL_NAMES } = require('../CONST');

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns {import('sequelize').Model}
 */
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models[MODEL_NAMES.LOG_BOOK], {
        foreignKey: 'userId',
        as: 'logBooks',
      });
      this.hasMany(models[MODEL_NAMES.LOG_BOOK_CONTACT], {
        foreignKey: 'userId',
        as: 'logBookContacts',
      });
    }

    static findByUserId(userId) {
      return this.findOne({ where: { id: userId } });
    }
  }
  UserProfile.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      profilePic: {
        type: DataTypes.STRING(2048),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      callSign: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      coordinates: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      gridSquare: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bands: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      modes: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: MODEL_NAMES.USER_PROFILE,
    }
  );
  return UserProfile;
};
