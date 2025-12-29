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

// Đồng bộ trạng thái đơn hàng từ GHN (chủ động lấy thông tin)
router.post('/sync/:orderId', authenticateToken, orderController.syncOrderStatusFromGHN);

// Đồng bộ tất cả đơn hàng chưa hoàn thành (có thể chạy định kỳ)
router.post('/sync-all', orderController.syncAllPendingOrders);

// Lấy link in đơn hàng từ GHN (token có hiệu lực 30 phút)
router.get('/print/:orderId', authenticateToken, orderController.getPrintOrderUrl);

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

// Debug: Giả lập webhook GHN để test (development only)
router.post('/debug/simulate-delivered', async (req, res) => {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            return res.status(400).json({ success: false, message: 'orderId required' });
        }
        
        const { sequelize } = require('../config/database');
        await sequelize.query(
            `UPDATE orders 
             SET status = 'completed', 
                 payment_status = 'paid',
                 updated_at = NOW()
             WHERE id = ?`,
            { replacements: [orderId] }
        );
        
        res.json({ success: true, message: `Order ${orderId} marked as delivered` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Debug: Cập nhật trạng thái bất kỳ (development only)
router.post('/debug/update-status', async (req, res) => {
    try {
        const { orderId, status, paymentStatus } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: 'orderId and status required' });
        }
        
        const { sequelize } = require('../config/database');
        await sequelize.query(
            `UPDATE orders 
             SET status = ?, 
                 payment_status = ?,
                 updated_at = NOW()
             WHERE id = ?`,
            { replacements: [status, paymentStatus || 'pending', orderId] }
        );
        
        res.json({ success: true, message: `Đơn hàng ${orderId} đã cập nhật thành ${status}` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
