const express = require('express');
const router = express.Router();
const conversionController = require('../controllers/conversionController');

router.post('/', conversionController.recordConversion);
router.get('/', conversionController.getRecentConversions);

module.exports = router;
