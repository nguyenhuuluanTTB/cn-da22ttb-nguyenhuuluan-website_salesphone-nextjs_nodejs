const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const orderListController = require('../controller/orderListController');
const authenticateToken = require('../middleware/authenticateToken');
const validateRequest = require('../middleware/validateRequest');

// Tạo đơn hàng mới
router.post('/create', validateRequest, authenticateToken, orderController.createOrder);

// Lấy danh sách đơn hàng của user
router.get('/list', authenticateToken, orderListController.getUserOrders);

// Lấy chi tiết đơn hàng
router.get('/:orderId', authenticateToken, orderListController.getOrderDetail);

// Webhook từ Giao Hàng Nhanh (không cần auth vì từ external service)
router.post('/ghn-webhook', orderController.ghnWebhook);

module.exports = router;
