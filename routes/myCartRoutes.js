// Import Express and controller functions
const express = require('express');
const { getMyCartByEmail, removeItemFromMyCartByCartId, updateCartItemQuantityByCartId, addItemInMyCart } = require('../controllers/myCartController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
// Create a router
const router = express.Router();

// Define routes
router.get('/:userEmail', verifyToken, getMyCartByEmail);
router.post('/addToCart', verifyToken , addItemInMyCart);
router.put('/:cartId', verifyToken, updateCartItemQuantityByCartId);
router.delete('/:cartId', verifyToken , removeItemFromMyCartByCartId);

// Export router
module.exports = router;
