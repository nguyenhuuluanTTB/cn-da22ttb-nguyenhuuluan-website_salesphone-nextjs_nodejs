const axios = require('axios');
const crypto = require('crypto');
const sepayConfig = require('../config/sepay');

class SepayService {
  /**
   * Tạo mã giao dịch duy nhất
   */
  generateTransactionId() {
    return 'SP' + Date.now() + Math.floor(Math.random() * 10000);
  }

  /**
   * Tạo chữ ký bảo mật
   */
  generateSignature(data) {
    const sortedData = Object.keys(data)
      .sort()
      .reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});

    const dataString = Object.values(sortedData).join('|');
    return crypto
      .createHmac('sha256', sepayConfig.secretKey)
      .update(dataString)
      .digest('hex');
  }

  /**
   * Tạo QR code thanh toán
   */
  async createPaymentQR(orderData) {
    try {
      const { orderId, amount, description } = orderData;

      // Tạo nội dung chuyển khoản
      const content = `${orderId} ${description}`.substring(0, 50);

      const paymentData = {
        accountNumber: sepayConfig.accountNumber,
        accountName: sepayConfig.accountName,
        amount: amount,
        content: content,
        bankCode: sepayConfig.bankCode
      };

      // Tạo link QR code (VietQR standard)
      const qrContent = `https://img.vietqr.io/image/${sepayConfig.bankCode}-${sepayConfig.accountNumber}-compact2.jpg?amount=${amount}&addInfo=${encodeURIComponent(content)}`;

      return {
        success: true,
        qrCode: qrContent,
        bankInfo: {
          bankCode: sepayConfig.bankCode,
          accountNumber: sepayConfig.accountNumber,
          accountName: sepayConfig.accountName,
          amount: amount,
          content: content
        }
      };
    } catch (error) {
      console.error('Create QR error:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Kiểm tra trạng thái giao dịch qua SePay API
   */
  async checkTransactionStatus(transactionId) {
    try {
      const response = await axios.get(`${sepayConfig.apiUrl}/transactions/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${sepayConfig.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Check transaction error:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Lấy lịch sử giao dịch từ SePay
   */
  async getTransactionHistory(startDate, endDate) {
    try {
      const response = await axios.get(`${sepayConfig.apiUrl}/transactions`, {
        headers: {
          'Authorization': `Bearer ${sepayConfig.apiKey}`,
          'Content-Type': 'application/json'
        },
        params: {
          start_date: startDate,
          end_date: endDate
        }
      });

      return {
        success: true,
        transactions: response.data.transactions || []
      };
    } catch (error) {
      console.error('Get history error:', error);
      return {
        success: false,
        message: error.message,
        transactions: []
      };
    }
  }

  /**
   * Xác thực webhook từ SePay
   */
  verifyWebhook(receivedSignature, data) {
    const calculatedSignature = this.generateSignature(data);
    return calculatedSignature === receivedSignature;
  }
}

module.exports = new SepayService();
