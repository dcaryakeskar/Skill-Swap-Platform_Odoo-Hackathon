const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'skillswap.sqlite',  // SQLite DB file
});

module.exports = sequelize;
