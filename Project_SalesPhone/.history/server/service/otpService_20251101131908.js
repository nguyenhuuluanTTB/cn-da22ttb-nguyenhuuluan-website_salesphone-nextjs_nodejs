const nodemailer = require('nodemailer');
const Otp = require('../model/Otp');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // thêm vào file .env
    pass: process.env.EMAIL_PASS  // thêm vào file .env
  }
});

exports.sendOtp = async (email) => {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 số
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // upsert OTP theo email, mỗi email chỉ giữ một OTP còn hạn
  await Otp.findOneAndUpdate(
    { email },
    { email, otp: otpCode, expiresAt },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // Gửi mail
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Mã OTP đăng nhập',
    text: `Mã OTP của bạn là: ${otpCode}. Mã này sẽ hết hạn sau 5 phút.`
  });

  return { message: 'OTP đã được gửi đến email của bạn' };
};

exports.verifyOtp = async (email, otp) => {
  const record = await Otp.findOne({ email, otp });
  if (!record) {
    throw new Error('Mã OTP không hợp lệ hoặc đã hết hạn');
  }
  if (record.expiresAt < new Date()) {
    throw new Error('Mã OTP đã hết hạn');
  }
  await Otp.deleteOne({ _id: record._id });
  return true;
};
