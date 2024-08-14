// Import Product model
const orders = require('../models/Orders');

// Get all products with optional quantity limit
exports.getAllMyOrders = async (req, res) => {
    const {email} = req.params;
    console.log("🚀 ~ exports.getAllMyOrders= ~ email:", email)
    try {
        const orderList = await orders.find({email});
        res.json(orderList);
    } catch (error) {
        console.error('Error fetching orderList:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all products with optional quantity limit
exports.getAllOrders = async (req, res) => {
    try {
        const orderList = await orders.find();
        console.log("🚀 ~ exports.getAllOrders= ~ orderList:", orderList)
        res.json(orderList);
    } catch (error) {
        console.error('Error fetching orderList:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// // Get product by ID
// exports.getProductById = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const product = await products.findById(id);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.json(product);
//     } catch (error) {
//         console.error('Error fetching product:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Delete product by ID
// exports.deleteProduct = async (req, res) => {
//     const id = req.params.itemId;
//     try {
//         const result = await products.findByIdAndDelete(id);
//         if (!result) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.json(result);
//     } catch (error) {
//         console.error('Error deleting product:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Update product by category
// exports.updateProduct = async (req, res) => {
//     const { title, brand, category, price, discount,  discountType, sku, quantity, description, rating, thumbnail, morePhotos} = req.body;
//     const { productId } = req.params;

//     try {
//         const product = await products.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         product.title = title || product.title;
//         product.brand = brand || product.brand;
//         product.category = category || product.category;
//         product.price = price || product.price;
//         product.discount = discount || product.discount;
//         product.discountType = discountType || product.discountType;
//         product.sku = sku || product.sku;
//         product.quantity = quantity || product.quantity;
//         product.description = description || product.description;
//         product.rating = rating || product.rating;
//         product.thumbnail = thumbnail || product.thumbnail;
//         product.morePhotos = morePhotos || product.morePhotos;

//         await product.save();
//         res.json(product);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


// Create new product
exports.createNewOrder = async (req, res) => {
    // Extract product data from request body
    const {
        fullName,
        phone,
        email,
        address,
        myCart,
    } = req.body;

    // Create a new product instance
    const newOrder = new orders({
        fullName,
        phone,
        email,
        address,
        myCart,
    });

    try {
        // Save the new product to the database
        const saveOrder = await newOrder.save();
        res.status(201).json(saveOrder);
    } catch (error) {
        console.error('Error saving producnew order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
