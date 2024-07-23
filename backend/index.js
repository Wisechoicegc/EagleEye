// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const sequelize = require('./config/database'); // Initialize Sequelize

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Use cors middleware
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// Protect routes using the authMiddleware
app.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

app.get('/', (req, res) => {
  res.send('EAGLE EYE CRM Backend');
});

// Sync Sequelize and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
