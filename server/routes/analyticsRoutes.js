const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/', analyticsController.getOverallAnalytics);
router.get('/variants', analyticsController.getVariantAnalytics);
router.get('/funnel', analyticsController.getFunnelAnalytics);
router.post('/seed', analyticsController.seedDemoData);
router.post('/reset', analyticsController.resetData);

module.exports = router;
