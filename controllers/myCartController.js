// Import Product model
const mycarts = require('../models/MyCart');

// Get product by ID
exports.getMyCartByEmail = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await mycarts.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete product by ID
exports.removeItemFromMyCartByCartId = async (req, res) => {
    const id = req.params.itemId;
    try {
        const result = await mycarts.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update product by category
exports.updateCartItemQuantityByCartId = async (req, res) => {
    const { title, brand, category, price, discount,  discountType, sku, quantity, description, rating, thumbnail, morePhotos} = req.body;
    const { productId } = req.params;

    try {
        const product = await mycarts.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'User not found' });
        }

        product.title = title || product.title;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.price = price || product.price;
        product.discount = discount || product.discount;
        product.discountType = discountType || product.discountType;
        product.sku = sku || product.sku;
        product.quantity = quantity || product.quantity;
        product.description = description || product.description;
        product.rating = rating || product.rating;
        product.thumbnail = thumbnail || product.thumbnail;
        product.morePhotos = morePhotos || product.morePhotos;

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Create new product
exports.addItemInMyCart = async (req, res) => {
    // Extract product data from request body
    const {
        title,
        productId,
        brand,
        category,
        price,
        sku,
        quantity,
        thumbnail,
        attributes,
    } = req.body;

    // Create a new Cart instance
    const newCartItem = new MyCart({
        title,
        productId,
        brand,
        category,
        price,
        sku,
        quantity,
        thumbnail,
        attributes,
    });

    try {
        // Save the new Cart item to the database
        const addItem = await newCartItem.save();
        res.status(201).json(addItem);
    } catch (error) {
        console.error('Error adding cart :', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
