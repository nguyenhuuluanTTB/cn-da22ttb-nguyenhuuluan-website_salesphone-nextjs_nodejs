const express = require('express');
const router = express.Router();
const { registerValidator, loginValidator } = require('../validation/authValidation');
const validateRequest = require('../middleware/validateRequest');
const authController = require('../controller/authController');

// Đăng ký
router.post('/register', registerValidator, validateRequest, authController.register);

// Gửi OTP
router.post('/send-otp', loginValidator, validateRequest, authController.sendOtp);

// Xác thực OTP
router.post('/verify-otp', validateRequest, authController.verifyOtp);

// (tuỳ chọn) đăng nhập thường
router.post('/login', loginValidator, validateRequest, authController.login);

// Đăng nhập Google: client gửi idToken
router.post('/login-google', authController.loginGoogle);

// Fallback: OAuth redirect flow
router.get('/login-google', authController.loginGoogleRedirect);
router.get('/login-google/callback', authController.loginGoogleCallback);

module.exports = router;
