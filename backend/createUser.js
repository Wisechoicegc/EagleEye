const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
});

// Define User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Function to create a new user
async function createUser() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const hashedPassword = await bcrypt.hash('Flordia1$', 10);

    const newUser = await User.create({
      name: 'Master Admin',
      email: 'info@astrobytemarketing.com',
      password: hashedPassword,
    });

    console.log('User created successfully:', newUser);
  } catch (error) {
    console.error('Unable to create user:', error);
  } finally {
    await sequelize.close();
  }
}

createUser();
