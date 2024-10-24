// controllers/reportController.js
const PDFDocument = require('pdfkit');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Helper function to draw a horizontal line
const drawLine = (doc) => {
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
};

// Generate PDF for products
const generateProductReport = async (req, res) => {
  const doc = new PDFDocument({ margin: 50 });
  let filename = `products_report.pdf`;
  res.setHeader('Content-disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-type', 'application/pdf');

  // Header
  doc.fontSize(30).fillColor('#3b5998').text('Product Report', { align: 'center' });
  drawLine(doc);
  doc.moveDown(1.5);

  try {
    const products = await Product.find(); // Fetch product data

    products.forEach(product => {
      doc.fontSize(18).fillColor('black').text(`Product Name: ${product.name}`, { underline: true });
      doc.fontSize(14).fillColor('#555555').text(`Stock Level: ${product.stock}`);
      doc.moveDown(1.5);
    });

    drawLine(doc);
    doc.end();
    doc.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate product report', error });
  }
};

// Generate PDF for orders
const generateOrderReport = async (req, res) => {
  const doc = new PDFDocument({ margin: 50 });
  let filename = `orders_report.pdf`;
  res.setHeader('Content-disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-type', 'application/pdf');

  // Header
  doc.fontSize(30).fillColor('#28a745').text('Order Report', { align: 'center' });
  drawLine(doc);
  doc.moveDown(1.5);

  try {
    const orders = await Order.find(); // Fetch order data

    orders.forEach(order => {
      doc.fontSize(18).fillColor('black').text(`Order ID: ${order._id}`, { underline: true });
      doc.fontSize(14).fillColor('#555555').text(`Customer Name: ${order.customerName}`);
      doc.text(`Total Price: $${order.totalPrice.toFixed(2)}`);
      doc.text(`Status: ${order.status}`);
      doc.moveDown(1.5);
    });

    drawLine(doc);
    doc.end();
    doc.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate order report', error });
  }
};

// Generate PDF for shipments
const generateShipmentReport = async (req, res) => {
  const doc = new PDFDocument({ margin: 50 });
  const filename = `shipments_report.pdf`;
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-Type', 'application/pdf');

  // Header
  doc.fontSize(30).fillColor('#ff9800').text('Shipment Report', { align: 'center' });
  drawLine(doc);
  doc.moveDown(1.5);

  try {
    const orders = await Order.find(); // Fetch orders (assumes shipments are part of orders)

    orders.forEach(order => {
      if (order.status === 'shipped') { // Only include shipped orders
        doc.fontSize(18).fillColor('black').text(`Shipment ID: ${order._id}`, { underline: true });
        doc.fontSize(14).fillColor('#555555').text(`Tracking Number: ${order.trackingNumber || 'N/A'}`);
        doc.text(`Shipment Date: ${order.shipmentDate ? order.shipmentDate.toDateString() : 'N/A'}`);
        doc.moveDown(1.5);
      }
    });

    drawLine(doc);
    doc.end();
    doc.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate shipment report', error });
  }
};

module.exports = {
  generateProductReport,
  generateOrderReport,
  generateShipmentReport,
};
