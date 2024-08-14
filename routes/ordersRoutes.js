// Import Express and controller functions
const express = require('express');
const { createNewOrder, getAllMyOrders, getAllOrders } = require('../controllers/ordersControler');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Create a router
const router = express.Router();

// Define routes
router.get('/:email', verifyToken, getAllMyOrders);
router.get('/getallOrder', verifyAdmin, getAllOrders);
router.post('/', createNewOrder);

// Export router
module.exports = router;
