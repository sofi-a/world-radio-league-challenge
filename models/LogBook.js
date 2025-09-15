const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database');
const { MODEL_NAMES } = require('./constants');
const LogBookContact = require('./LogBookContact');
const UserProfile = require('./UserProfile');

class LogBook extends Model {}

LogBook.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
}, {
  sequelize,
  modelName: MODEL_NAMES.LOG_BOOK,
  timestamps: true,
});

LogBook.hasMany(LogBookContact, { foreignKey: 'logBookId', as: 'contacts' });
LogBook.belongsTo(UserProfile, { foreignKey: 'userId', as: 'user' });

module.exports = LogBook;