const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');
const authenticateToken = require('../middleware/authenticateToken');

// Tạo thanh toán mới
router.post('/create', authenticateToken, paymentController.createPayment);

// Webhook từ SePay
router.post('/webhook', paymentController.sepayWebhook);

// Kiểm tra trạng thái thanh toán
router.get('/status/:orderId', authenticateToken, paymentController.checkPaymentStatus);

// Lịch sử giao dịch
router.get('/history', authenticateToken, paymentController.getPaymentHistory);

module.exports = router;
