const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  orderDate: { type: Date, default: Date.now },
  shipmentDate: { type: Date },  // Add shipment date field
  trackingNumber: { type: String },  // Add tracking number field
});

module.exports = mongoose.model('Order', orderSchema);
