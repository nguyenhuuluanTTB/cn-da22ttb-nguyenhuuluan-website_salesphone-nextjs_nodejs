const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const authenticateToken = require('../middleware/authenticateToken');
const validateRequest = require('../middleware/validateRequest');

// Tạo đơn hàng mới
router.post('/create', validateRequest, authenticateToken, orderController.createOrder);

// Webhook từ Giao Hàng Nhanh (không cần auth vì từ external service)
router.post('/ghn-webhook', orderController.ghnWebhook);

module.exports = router;
