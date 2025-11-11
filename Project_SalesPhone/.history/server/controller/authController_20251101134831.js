const pool = require("../config/database");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const { generateToken } = require("../util/authUtils");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Đăng ký tài khoản
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kiểm tra email tồn tại chưa
    const [rows] = await pool.query("SELECT * FROM user_account WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Tạo tài khoản
    const [result] = await pool.query(
      "INSERT INTO user_account (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    const newUser = {
      id_user: result.insertId,
      name,
      email,
    };

    res.status(201).json({ message: "Đăng ký thành công", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi đăng ký" });
  }
};

// Đăng nhập tài khoản
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM user_account WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Sai email hoặc mật khẩu" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Sai email hoặc mật khẩu" });
    }

    const token = generateToken({ id_user: user.id_user, email: user.email });
    res.json({ token, message: "Đăng nhập thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi đăng nhập" });
  }
};

// Gửi OTP (demo)
exports.sendOtp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM user_account WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    const user = rows[0];

    if (user.password === "GOOGLE_AUTH" || !user.password) {
      return res.status(400).json({
        message: "Tài khoản này chỉ hỗ trợ đăng nhập bằng Google.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Lưu OTP tạm thời (ở đây demo console.log)
    console.log(`Gửi OTP ${otp} tới email ${email}`);

    // Lưu OTP tạm trong bộ nhớ (thật tế bạn nên lưu vào Redis)
    global.otpStorage = global.otpStorage || {};
    global.otpStorage[email] = otp;

    res.json({ step: "otp", message: "OTP đã được gửi về email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi gửi OTP" });
  }
};

// Xác thực OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!global.otpStorage || global.otpStorage[email] !== otp) {
      return res.status(400).json({ message: "OTP không hợp lệ" });
    }

    const [rows] = await pool.query("SELECT * FROM user_account WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    const user = rows[0];
    const token = generateToken({ id_user: user.id_user, email: user.email });
    delete global.otpStorage[email]; // xoá sau khi xác thực

    res.json({ token, message: "Đăng nhập thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi xác thực OTP" });
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

    const [rows] = await pool.query("SELECT * FROM user_account WHERE email = ?", [email]);
    let user = rows[0];

    if (!user) {
      const [result] = await pool.query(
        "INSERT INTO user_account (name, email, password) VALUES (?, ?, ?)",
        [name, email, "GOOGLE_AUTH"]
      );
      user = { id_user: result.insertId, name, email };
    }

    const token = generateToken({ id_user: user.id_user, email: user.email });
    res.json({
      token,
      user: { id_user: user.id_user, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Lỗi khi đăng nhập bằng Google" });
  }
};

exports.loginGoogleRedirect = (req, res) => {
  res.status(501).json({ message: "Chức năng Google Redirect chưa triển khai" });
};

exports.loginGoogleCallback = (req, res) => {
  res.status(501).json({ message: "Chức năng Google Callback chưa triển khai" });
};
