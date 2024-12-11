// // Import required modules
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// // const morgan = require('morgan'); // For logging
// const loggerMiddleware = require('./middleware/loggerMiddleware');
// const errorHandler = require('./middleware/errorHandler');
// require('dotenv').config();

// // Import route files
// const userRoutes = require('./routes/userRoutes');
// const institutionRoutes = require('./routes/institutionRoutes');
// const departmentRoutes = require('./routes/departmentRoutes');
// const reportRoutes = require('./routes/reportRoutes');
// const capaRoutes = require('./routes/capaRoutes');
// const recallRoutes = require('./routes/recallRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');
// const logRoutes = require('./routes/logRoutes');

// // Initialize the app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(loggerMiddleware);

// // Root Route
// app.get('/', (req, res) => res.send({ message: 'Backend is running successfully!' }));

// // API Health Check
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'UP', timestamp: new Date() });
// });

// // Mount Routes
// app.use('/api/users', userRoutes);
// app.use('/api/institutions', institutionRoutes);
// app.use('/api/departments', departmentRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/capa', capaRoutes);
// app.use('/api/recalls', recallRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/logs', logRoutes);

// // Error Handling Middleware
// app.use(errorHandler);


// //Database Sequelization
// const models = require('./models');
// models.sequelize.sync({ alter: true }) // or { alter: true }
//   .then(() => {
//     console.log('Database synchronized successfully.');
//   })
//   .catch((error) => {
//     console.error('Error syncing database:', error);
//   });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorHandler = require('./middleware/errorHandler');
const models = require('./models'); // Sequelize models
require('dotenv').config();

// Import route files
const userRoutes = require('./routes/userRoutes');
const institutionRoutes = require('./routes/institutionRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const reportRoutes = require('./routes/reportRoutes');
const capaRoutes = require('./routes/capaRoutes');
const recallRoutes = require('./routes/recallRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const logRoutes = require('./routes/logRoutes');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(loggerMiddleware);

// Root Route
app.get('/', (req, res) => res.send({ message: 'Backend is running successfully!' }));

// API Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Mount Routes
app.use('/api/users', userRoutes);
app.use('/api/institutions', institutionRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/capa', capaRoutes);
app.use('/api/recalls', recallRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/logs', logRoutes);

// Error Handling Middleware
app.use(errorHandler);

// console.log('Current Environment:', process.env.NODE_ENV);
// Database Sequelization
models.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established.');
    return models.sequelize.sync({ alter: false }); // Automatically sync database tables
  })
  .then(() => {
    console.log('Database synchronized successfully.');
    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
    process.exit(1); // Exit if database sync fails
  });
