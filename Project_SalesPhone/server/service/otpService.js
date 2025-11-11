// otpService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Lưu OTP trong memory
const otpStorage = {}; // { email: { otp: '123456', expiresAt: Date } }

exports.sendOtp = async (email) => {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 phút

  otpStorage[email] = { otp: otpCode, expiresAt };

  // Gửi email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Mã OTP đăng nhập',
    text: `Mã OTP của bạn là: ${otpCode}. Mã này sẽ hết hạn sau 5 phút.`
  });

  return { message: 'OTP đã được gửi đến email của bạn' };
};

exports.verifyOtp = async (email, otp) => {
  const record = otpStorage[email];
  if (!record) throw new Error('OTP không hợp lệ');

  if (record.expiresAt < Date.now()) {
    delete otpStorage[email];
    throw new Error('OTP đã hết hạn');
  }

  if (record.otp !== otp) throw new Error('OTP không hợp lệ');

  // Xóa OTP sau khi dùng
  delete otpStorage[email];
  return true;
};
