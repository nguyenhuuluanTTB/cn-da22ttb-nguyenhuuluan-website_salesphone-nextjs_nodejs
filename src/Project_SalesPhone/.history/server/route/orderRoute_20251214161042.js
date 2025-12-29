const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const authenticateToken = require('../middleware/authenticateToken');
const validateRequest = require('../middleware/validateRequest');

// Tạo đơn hàng mới
router.post('/create', validateRequest, authenticateToken, orderController.createOrder);

module.exports = router;
