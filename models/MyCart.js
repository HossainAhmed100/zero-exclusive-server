const mongoose = require('mongoose');

const myCartSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  attributes: {
    type: Map,
    of: String,
    required: true,
  }
});

const MyCart = mongoose.model('MyCart', myCartSchema);

module.exports = MyCart;
