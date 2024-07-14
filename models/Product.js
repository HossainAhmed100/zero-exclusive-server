const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    default: 'N/A',
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  discountType: {
    type: String,
    required: true,
    enum: [
      'cashDiscount',
      'buyOneGetOneFree',
      'clearanceDiscount',
      'loyaltyDiscount',
      'holidayDiscount',
      'studentDiscount',
      'limitedTimeDiscount',
      'flashSaleDiscount'
    ],
  },
  sku: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  morePhotos: [{
    type: String
  }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
