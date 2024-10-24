const express = require('express');
const { updateStock } = require('../controllers/stockController');
const router = express.Router();

// Update stock level route
router.put('/products/:id/stock', updateStock);

module.exports = router;
