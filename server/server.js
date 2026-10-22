require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Initialize DB connection
require('./config/db');

const eventRoutes = require('./routes/eventRoutes');
const conversionRoutes = require('./routes/conversionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for student demo & local testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    project: 'CRO Lab – Conversion Rate Optimization & A/B Testing Platform',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/events', eventRoutes);
app.use('/api/conversions', conversionRoutes);
app.use('/api/analytics', analyticsRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err);
  res.status(500).json({
    success: false,
    error: 'An internal server error occurred',
    message: err.message
  });
});

// Start Server only if not imported as module (e.g., in tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 CRO Lab Backend running on http://localhost:${PORT}`);
    console.log(`📊 Analytics API: http://localhost:${PORT}/api/analytics`);
    console.log(`🧪 Health Check:  http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
}

module.exports = app;
