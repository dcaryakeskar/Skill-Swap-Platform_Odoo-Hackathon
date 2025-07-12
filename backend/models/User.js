const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  location: DataTypes.STRING,
  profilePhoto: DataTypes.STRING,
  availability: DataTypes.STRING,
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  skillsOffered: DataTypes.STRING,  // comma-separated
  skillsWanted: DataTypes.STRING,
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  feedbackCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isBanned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User;
