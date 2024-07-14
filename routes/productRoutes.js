// Import Express and controller functions
const express = require('express');
const { getAllProducts, getProductById, deleteProduct, updateProduct, createProduct } = require('../controllers/productController');

// Create a router
const router = express.Router();

// Define routes
router.get('/:quantity', getAllProducts);
router.get('/productsById/:id', getProductById);
router.delete('/:itemId', deleteProduct);
router.patch('/:id', updateProduct);
router.post('/addnewProduct', createProduct);

// Export router
module.exports = router;
