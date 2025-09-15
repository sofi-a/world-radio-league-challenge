const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database');
const { MODEL_NAMES } = require('./constants');
const LogBook = require('./LogBook');
const User = require('./UserProfile');

class LogBookContact extends Model {}

LogBookContact.init({
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
    type: DataTypes.STRING,
    allowNull: true,
  },
  theirProfilePic: {
    type: DataTypes.STRING,
    allowNull: true,
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
}, {
  sequelize,
  modelName: MODEL_NAMES.LOG_BOOK_CONTACT,
  timestamps: true,
});

LogBookContact.belongsTo(LogBook, { foreignKey: 'logBookId', as: 'logBook' });
LogBookContact.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = LogBookContact;