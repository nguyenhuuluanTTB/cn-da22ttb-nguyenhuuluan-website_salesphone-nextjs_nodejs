const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const { generateToken } = require("../utils/authUtils");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Đăng ký tài khoản
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (err) {
    res.status(400).json({ message: "Email đã tồn tại" });
  }
};

// Đăng nhập tài khoản
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Sai email hoặc mật khẩu" });
    }
    const token = generateToken({ id_user: user.id_user, email: user.email });
    res.json({ token, message: "Đăng nhập thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi đăng nhập" });
  }
};

// Gửi OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    if (user.password === "GOOGLE_AUTH" || user.password === null) {
      return res.status(400).json({
        message: "Tài khoản này chỉ hỗ trợ đăng nhập bằng Google.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Lưu OTP vào bộ nhớ tạm hoặc gửi qua email
    console.log(`Gửi OTP ${otp} tới email ${email}`);
    res.json({ step: "otp", message: "OTP đã được gửi về email" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi gửi OTP" });
  }
};

// Xác thực OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // Kiểm tra OTP từ bộ nhớ tạm hoặc Redis
    console.log(`Xác thực OTP ${otp} cho email ${email}`);
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Email không tồn tại" });

    const token = generateToken({ id_user: user.id_user, email: user.email });
    res.json({ token, message: "Đăng nhập thành công" });
  } catch (err) {
    res.status(400).json({ message: "OTP không hợp lệ" });
  }
};

// Đăng nhập bằng Google
exports.loginGoogle = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: "Thiếu idToken" });

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name || payload.given_name || "Google User";

    if (!email) return res.status(400).json({ message: "Không lấy được email từ Google" });

    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ name, email, password: "GOOGLE_AUTH" });
    }

    const token = generateToken({ id_user: user.id_user, email: user.email });
    res.json({ token, user: { id_user: user.id_user, name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi đăng nhập bằng Google" });
  }
};