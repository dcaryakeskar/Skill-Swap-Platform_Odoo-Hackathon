const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const SwapRequest = sequelize.define('SwapRequest', {
  requesterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  offeredSkill: DataTypes.STRING,
  requestedSkill: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'  // pending | accepted | rejected
  }
});

User.hasMany(SwapRequest, { foreignKey: 'requesterId', as: 'sentRequests' });
User.hasMany(SwapRequest, { foreignKey: 'recipientId', as: 'receivedRequests' });

module.exports = SwapRequest;
