// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route to generate product report
router.get('/report/products', reportController.generateProductReport);

// Route to generate order report
router.get('/report/orders', reportController.generateOrderReport);

// Route to generate shipment report
router.get('/report/shipments', reportController.generateShipmentReport);

module.exports = router;
