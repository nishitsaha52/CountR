const express = require('express');
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct, getLowStockProducts } = require('../controllers/productController');
const router = express.Router();

// CRUD Routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Low stock/reorder level alert
router.get('/products/:id/reorder', getLowStockProducts);

module.exports = router;