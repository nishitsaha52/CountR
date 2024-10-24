// routes/shipmentRoutes.js
const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');

// Route to get all shipped orders
router.get('/shipments', shipmentController.getShippedOrders);

// Route to update shipment details for a specific order
router.put('/orders/:id/shipment', shipmentController.updateShipmentDetails);

module.exports = router;
