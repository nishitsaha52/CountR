const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  reorderLevel: { type: Number, default: 5 }, // Notify when stock is below this level
});

// Update stock method (e.g., after shipment or sale)
productSchema.methods.updateStock = function (quantityChange) {
    this.stock += quantityChange; // Add or subtract from current stock
    return this.save();
  };
  
module.exports = mongoose.model('Product', productSchema);
