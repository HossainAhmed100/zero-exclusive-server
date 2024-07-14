// Import Express and controller functions
const express = require('express');
const { register, login } = require('../controllers/authController');

// Create a router
const router = express.Router();

// Define routes
router.post('/register', register);
router.post('/login', login);

// Export router
module.exports = router;
