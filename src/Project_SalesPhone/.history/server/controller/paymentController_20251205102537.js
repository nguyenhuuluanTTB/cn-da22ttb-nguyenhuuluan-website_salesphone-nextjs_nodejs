const sepayService = require('../service/sepayService');
const { sequelize } = require('../config/database');

/**
 * Tạo đơn thanh toán
 */
exports.createPayment = async (req, res) => {
  try {
    const { orderId, amount, description } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu thông tin đơn hàng'
      });
    }

    // Tạo QR code thanh toán
    const paymentResult = await sepayService.createPaymentQR({
      orderId,
      amount,
      description: description || 'Thanh toán đơn hàng'
    });

    if (!paymentResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Không thể tạo thanh toán'
      });
    }

    // Lưu thông tin giao dịch vào database
    await sequelize.query(
      `INSERT INTO payments (order_id, amount, status, payment_method, transaction_code, created_at)
       VALUES (?, ?, 'pending', 'sepay', ?, NOW())`,
      {
        replacements: [orderId, amount, orderId]
      }
    );

    return res.json({
      success: true,
      message: 'Tạo thanh toán thành công',
      data: paymentResult
    });
  } catch (error) {
    console.error('Create payment error:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Webhook nhận thông báo từ SePay khi có giao dịch
 */
exports.sepayWebhook = async (req, res) => {
  try {
    const { signature, ...transactionData } = req.body;

    // Xác thực chữ ký
    const isValid = sepayService.verifyWebhook(signature, transactionData);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid signature'
      });
    }

    const { transaction_code, amount, content, status } = transactionData;

    // Tìm order_id từ nội dung chuyển khoản
    const orderIdMatch = content.match(/^(\w+)/);
    if (!orderIdMatch) {
      return res.status(400).json({
        success: false,
        message: 'Không tìm thấy mã đơn hàng'
      });
    }

    const orderId = orderIdMatch[1];

    // Cập nhật trạng thái thanh toán
    await sequelize.query(
      `UPDATE payments 
       SET status = ?, transaction_code = ?, updated_at = NOW()
       WHERE order_id = ?`,
      {
        replacements: [status === 'success' ? 'completed' : 'failed', transaction_code, orderId]
      }
    );

    // Nếu thanh toán thành công, cập nhật đơn hàng
    if (status === 'success') {
      await sequelize.query(
        `UPDATE orders SET payment_status = 'paid', status = 'processing' WHERE id = ?`,
        {
          replacements: [orderId]
        }
      );
    }

    return res.json({
      success: true,
      message: 'Webhook processed'
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Kiểm tra trạng thái thanh toán
 */
exports.checkPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const [results] = await sequelize.query(
      `SELECT * FROM payments WHERE order_id = ? ORDER BY created_at DESC LIMIT 1`,
      {
        replacements: [orderId]
      }
    );

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy giao dịch'
      });
    }

    return res.json({
      success: true,
      data: results[0]
    });
  } catch (error) {
    console.error('Check status error:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Lấy lịch sử giao dịch
 */
exports.getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id; // Từ middleware authenticateToken

    const [results] = await sequelize.query(
      `SELECT p.*, o.total_amount, o.status as order_status
       FROM payments p
       JOIN orders o ON p.order_id = o.id
       WHERE o.user_id = ?
       ORDER BY p.created_at DESC`,
      {
        replacements: [userId]
      }
    );

    return res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Get history error:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
