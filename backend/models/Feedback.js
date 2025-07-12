const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Feedback = sequelize.define('Feedback', {
  fromUserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  toUserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 }
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Optional: add associations
User.hasMany(Feedback, { foreignKey: 'toUserId', as: 'receivedFeedback' });
User.hasMany(Feedback, { foreignKey: 'fromUserId', as: 'givenFeedback' });

module.exports = Feedback;
