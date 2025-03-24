const { Sequelize } = require('sequelize');
const { config } = require('./config');
const path = require('path');
const initModels = require('../models/init-models');
const fs = require('fs');

// Sequelize Connection
// No SSL certificate required
const sequelize = new Sequelize(
    config.dbName,
    config.dbUser,
    config.dbPassword,
    {
      host: config.dbHost,
      port: config.dbPort,
      dialect: 'postgres',
      dialectOptions: {
        ssl: false
      }
    }
  );

// Basic sync - creates tables if they don't exist
// sequelize.sync();
// Force sync - drops all tables and recreates them (DANGEROUS)
// sequelize.sync({ force: true });
// Alter sync - alters tables to match models (RISKY)
sequelize.sync({ alter: true });

const models = initModels(sequelize);

module.exports = { sequelize, models };