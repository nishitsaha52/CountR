const express = require('express');
const { getOrders, getOrderById, addOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

// CRUD Routes for orders
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', addOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

module.exports = router;
 