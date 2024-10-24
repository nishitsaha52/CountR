const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Link to the Order model
        required: true
    },
    shippingDate: {
        type: Date,
        required: true
    },
    trackingNumber: {
        type: String,
        required: true
    },
    carrier: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'], // Add more statuses if necessary
        default: 'pending'
    }
});

const Shipment = mongoose.model('Shipment', shipmentSchema);
module.exports = Shipment;
