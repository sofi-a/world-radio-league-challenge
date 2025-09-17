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
  class LogBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models[MODEL_NAMES.LOG_BOOK_CONTACT], { foreignKey: 'logBookId', as: 'contacts' });
      this.belongsTo(models[MODEL_NAMES.USER_PROFILE], { foreignKey: 'userId', as: 'user' });
    }
  }
  LogBook.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    defaultCallSign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coordinates: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    myAntenna: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    myRadio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lastContactTimestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: MODEL_NAMES.LOG_BOOK,
  });
  return LogBook;
};