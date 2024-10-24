const Product = require('../models/Product');

// Update stock level
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantityChange } = req.body; // Positive or negative value to adjust stock

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.updateStock(quantityChange); // Use the method defined in the model
    res.json({ message: 'Stock updated successfully', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update stock' });
  }
};

module.exports = { updateStock };
