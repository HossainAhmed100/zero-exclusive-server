const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  itemKey: { type: String, required: true },
  title: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  brand: { type: String, default: 'N/A' },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  sku: { type: Number, required: true },
  quantity: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  attributes: {
    color: { type: String, required: true },
    size: { type: String, required: true },
    designType: { type: String }
  }
});

const orderSchema = new Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  myCart: [cartItemSchema]  // Embed the cart item schema
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
