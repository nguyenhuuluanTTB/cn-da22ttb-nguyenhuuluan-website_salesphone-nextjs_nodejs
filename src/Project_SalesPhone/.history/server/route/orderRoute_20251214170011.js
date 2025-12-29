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

// Debug: Xem tất cả đơn hàng (development only)
router.get('/debug/all', async (req, res) => {
    try {
        const { sequelize } = require('../config/database');
        const [orders] = await sequelize.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 10');
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Lấy chi tiết đơn hàng
router.get('/:orderId', authenticateToken, orderListController.getOrderDetail);

// Webhook từ Giao Hàng Nhanh (không cần auth vì từ external service)
router.post('/ghn-webhook', orderController.ghnWebhook);

module.exports = router;
