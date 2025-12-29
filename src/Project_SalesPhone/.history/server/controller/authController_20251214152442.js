const  User = require("../model/User"); // Sequelize model
const  UserInformation = require("../model/UserInformation"); // Sequelize model

const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const { generateToken } = require("../util/authUtils");
const otpService = require("../service/otpService");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Đăng ký tài khoản
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email đã tồn tại" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    

    return res.status(201).json({ message: "Đăng ký thành công", user: { id: user.id_user, name, email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi server khi đăng ký" });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user theo email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Sai email hoặc mật khẩu" });
    }

    // Nếu tài khoản Google (không có password)
    if (!user.password || user.password === "GOOGLE_AUTH") {
      return res.status(400).json({ 
        message: "Tài khoản này chỉ hỗ trợ đăng nhập bằng Google" 
      });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Sai email hoặc mật khẩu" });
    }

    // Tạo token JWT
    const token = generateToken({ id: user.id, email: user.email });

    return res.json({ token, message: "Đăng nhập thành công" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi server khi đăng nhập" });
  }
};

// Gửi OTP
exports.sendOtp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email đã tồn tại" });

    // Bạn có thể thêm kiểm tra mật khẩu ở đây nếu cần

    // Gửi OTP (giả sử otpService.sendOtp gửi OTP về email)
    const otp = await otpService.sendOtp(email);

    return res.json({ step: "otp", message: otp.message });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi server khi gửi OTP" });
  }
};



// Xác thực OTP
/*exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    await otpService.verifyOtp(email, otp);

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Email không tồn tại" });

    const token = generateToken({ id: user.id, email: user.email });
    return res.json({ token, message: "Đăng nhập thành công" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};*/

// verifyOtp
exports.verifyOtp = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    await otpService.verifyOtp(email, otp);

    // Tạo user sau khi OTP hợp lệ
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken({ id: user.id, email: user.email });

    const userId = user.id_user; 
    await UserInformation.create({
        id_user: userId,
        fullname: '',
        phone_number: '',
        gender: '',
        address: ''
      });
    return res.json({ token, message: "Đăng ký thành công", user: { id: user.id, name, email } });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};


// Đăng nhập bằng Google One Tap
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
      user = await User.create({ name, email, password: "$adfadfas$q123sdfee" });
      
      const userId = user.id_user; 
      
      // Chỉ tạo UserInformation nếu là user mới
      await UserInformation.create({
        id_user: userId,
        fullname: '',
        phone_number: '',
        gender: '',
        address: ''
      });
    }

    const token = generateToken({ id: user.id_user, email: user.email });

    return res.json({ token, user: { id: user.id_user, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Error in loginGoogle:", err);
    return res.status(500).json({ message: err.message || "Lỗi server khi đăng nhập Google" });
  }
};

// OAuth redirect flow
// exports.loginGoogleRedirect = async (req, res) => {
//   try {
//     const client = new OAuth2Client(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET,
//       process.env.GOOGLE_REDIRECT_URI
//     );

//     const url = client.generateAuthUrl({
//       access_type: "offline",
//       scope: ["openid", "email", "profile"],
//       prompt: "consent",
//       redirect_uri: process.env.GOOGLE_REDIRECT_URI,
//     });

//     return res.redirect(url);
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ message: err.message });
//   }
// };

// exports.loginGoogleCallbackRedirect = async (req, res) => {
//   try {
//     const client = new OAuth2Client(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET,
//       process.env.GOOGLE_REDIRECT_URI
//     );

//     const { code } = req.query;
//     if (!code) return res.status(400).json({ message: "Thiếu code" });

//     const { tokens } = await client.getToken({ code, redirect_uri: process.env.GOOGLE_REDIRECT_URI });
//     const ticket = await client.verifyIdToken({ idToken: tokens.id_token, audience: process.env.GOOGLE_CLIENT_ID });

//     const payload = ticket.getPayload();
//     const email = payload.email;
//     const name = payload.name || payload.given_name || "Google User";

//     let user = await User.findOne({ where: { email } });
//     if (!user) {
//       user = await User.create({ name, email, password: "" });
//     }

//     const token = generateToken({ id: user.id, email: user.email });

//     const redirect = process.env.FRONTEND_URL || "http://localhost:3000";
//     return res.redirect(`${redirect}/login/success?token=${encodeURIComponent(token)}`);
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ message: err.message });
//   }
// };
