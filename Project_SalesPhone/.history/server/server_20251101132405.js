const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

module.exports = app; 

const app = require('./app');
const authController = require('./controller/authController');

const PORT = 5000;

// Sử dụng app từ app.js
app.use('/', require('./route/authRoute')); // Gắn route với prefix /api/auth

// Định nghĩa route gốc cho /login-google/callback
app.post('/login-google/callback', authController.loginGoogleCallback); // Cho One Tap
app.get('/login-google/callback', authController.loginGoogleCallbackRedirect); // Cho redirect

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});

app.get('/', (req, res) => res.send('API is running...'));