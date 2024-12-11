'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; // Determine the environment
const config = require(path.resolve(__dirname, '../config/config.js'))[env]; // Load environment-specific config
const db = {};

let sequelize;

// Initialize Sequelize based on environment variable or config
if (config.use_env_variable) {
  // Use connection string from environment variable
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Use explicit database credentials
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging: false, // Disable logging (Set `true` to debug queries)
  });
}

// Dynamically load all models in the `models` folder
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && // Ignore hidden files (e.g., `.DS_Store`)
      file !== basename && // Ignore the current file
      file.slice(-3) === '.js' // Load only `.js` files
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Attach model to the db object
  });

// Define associations between models, if any
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Call the `associate` method if defined in the model
  }
});

// Attach Sequelize instance and library to the db object
db.sequelize = sequelize; // Sequelize instance
db.Sequelize = Sequelize; // Sequelize library

module.exports = db; // Export the db object
