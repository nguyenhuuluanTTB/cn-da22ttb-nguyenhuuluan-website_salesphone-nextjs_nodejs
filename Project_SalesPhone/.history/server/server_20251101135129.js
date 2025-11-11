const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const authRoute = require('./route/authRoute');
const authController = require('./controller/authController');

// Load biến môi trường
dotenv.config();

// Kết nối cơ sở dữ liệu
connectDB();

// Khởi tạo ứng dụng Express
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoute); // Gắn route với prefix /api/auth
app.post('/login-google/callback', authController.loginGoogleCallback); // Cho One Tap
app.get('/login-google/callback', authController.loginGoogleCallbackRedirect); // Cho redirect

// Route mặc định
app.get('/', (req, res) => res.send('API is running...'));

// Khởi động server
const PORT = process.env.PORT || 5000; // Sử dụng biến môi trường cho PORT
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});