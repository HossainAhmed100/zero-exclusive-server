const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { getUserByEmail, getAllUsers, updateUserById } = require('../controllers/userController');

// Get user by email
router.get('/:email', verifyToken, getUserByEmail);

// Get all users (admin only)
router.get('/allUsers', verifyAdmin, getAllUsers);

// Update user
router.put('/:userId', verifyToken, updateUserById);

module.exports = router;
