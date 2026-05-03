const express = require('express');
const router = express.Router();
const { createCustomOrder, getCustomOrders } = require('../controllers/customOrderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createCustomOrder).get(protect, getCustomOrders);

module.exports = router;