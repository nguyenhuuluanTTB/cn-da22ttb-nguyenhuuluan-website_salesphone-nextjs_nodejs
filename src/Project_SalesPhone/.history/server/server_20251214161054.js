const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const authRoute = require('./route/authRoute');
const authController = require('./controller/authController');


//import cho product 
const productRoute = require('./route/productRoute');
const oneProductRoute = require('./route/oneProductRoute');
const userInfoRoute = require('./route/userInfoRoute');
const cartRoute = require('./route/cartRoute');
const paymentRoute = require('./route/paymentRoute');
const orderRoute = require('./route/orderRoute');


const cors = require('cors');
// Load biến môi trường
dotenv.config();

// Kết nối cơ sở dữ liệu
connectDB();

// Khởi tạo ứng dụng Express
const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // frontend Next.js
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // nếu bạn dùng cookie
}));

// Routes
app.use('/api/auth', authRoute); // Gắn route với prefix /api/auth
// app.post('/login-google/callback', authController.loginGoogleCallbackRedirect);
// app.get('/login-google/callback', authController.loginGoogleCallbackRedirect); // Cho redirect

//Routes cho product
app.use('/api/product',productRoute);

//Routes for add to cart
app.use('/api/cart', cartRoute);

//Routes for payment
app.use('/api/payment', paymentRoute);

app.use('/api', userInfoRoute);

// Route mặc định
app.get('/', (req, res) => res.send('API is running...'));

// Khởi động server
const PORT = process.env.PORT || 5000; // Sử dụng biến môi trường cho PORT
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});