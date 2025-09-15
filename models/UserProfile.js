const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database');
const { MODEL_NAMES } = require('./constants');
const LogBook = require('./LogBook');
const LogBookContact = require('./LogBookContact');

class UserProfile extends Model {}

UserProfile.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
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
    type: DataTypes.STRING,
    allowNull: true,
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
}, {
  sequelize,
  modelName: MODEL_NAMES.USER_PROFILE,
  timestamps: true,
});

UserProfile.hasMany(LogBook, { foreignKey: 'userId', as: 'logBooks' });
UserProfile.hasMany(LogBookContact, { foreignKey: 'userId', as: 'logBookContacts' });

module.exports = UserProfile;