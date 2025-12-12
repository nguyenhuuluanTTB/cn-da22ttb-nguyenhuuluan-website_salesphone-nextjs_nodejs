require('dotenv').config();

module.exports = {
  apiUrl: 'https://my.sepay.vn/userapi',
  apiKey: process.env.SEPAY_API_KEY || '',
  secretKey: process.env.SEPAY_SECRET_KEY || '',
  bankCode: process.env.SEPAY_BANK_CODE || '', // Mã ngân hàng (VCB, TCB, MB, etc.)
  accountNumber: process.env.SEPAY_ACCOUNT_NUMBER || '', // Số tài khoản nhận tiền
  accountName: process.env.SEPAY_ACCOUNT_NAME || '', // Tên tài khoản
  returnUrl: process.env.FRONTEND_URL + '/payment/callback',
  notifyUrl: process.env.BACKEND_URL + '/api/payment/sepay-webhook'
};
