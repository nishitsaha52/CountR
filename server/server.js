const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes'); // Import stock routes
const orderRoutes = require('./routes/orderRoutes');
const shipmentRoutes = require('./routes/shipmenRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', stockRoutes); // Register stock routes
app.use('/api', orderRoutes);
app.use('/api', shipmentRoutes);
app.use('/api', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
 