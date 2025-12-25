const { body } = require('express-validator');

exports.registerValidator = [
    body('name')
        .notEmpty().withMessage('Tên tài khoản không được để trống')
        .isLength({ min: 3, max: 30 }).withMessage('Tên phải từ 3 đến 30 ký tự')
        .matches(/^[A-Za-z0-9_]+$/).withMessage('Tên không được chứa khoảng trắng hoặc ký tự đặc biệt'),
    body('email')
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ'),
    body('password')
        .notEmpty().withMessage('Mật khẩu không được để trống')
        .isLength({ min: 8, max: 8 }).withMessage('Mật khẩu phải có 8 ký tự')
        .matches(/^\S*$/).withMessage('Mật khẩu không được chứa khoảng trắng')
        .matches(/[a-z]/).withMessage('Mật khẩu phải chứa ít nhất một ký tự chữ thường')
        .matches(/[A-Z]/).withMessage('Mật khẩu phải chứa ít nhất một ký tự chữ in hoa')
        .matches(/[0-9]/).withMessage('Mật khẩu phải chứa ít nhất một ký tự chữ số')
        .matches(/[^A-Za-z0-9\s]/).withMessage('Mật khẩu phải chứa ít nhất một ký tự đặc biệt'),
];

exports.loginValidator = [
    body('email')
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ'),
    body('password')
        .notEmpty().withMessage('Mật khẩu không được để trống')
];

exports.otpValidator = [
    body('email')
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ'),
    body('otp')
        .notEmpty().withMessage('OTP không được để trống')
        .isLength({ min: 6, max: 6 }).withMessage('OTP phải có 6 ký tự')
];

exports.forgotPasswordValidator = [
    body('email')
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ')
];

exports.resetPasswordValidator = [
    body('resetToken')
        .notEmpty().withMessage('Token không được để trống'),
    body('newPassword')
        .notEmpty().withMessage('Mật khẩu mới không được để trống')
        .isLength({ min: 8, max: 8 }).withMessage('Mật khẩu phải có 8 ký tự')
        .matches(/^\S*$/).withMessage('Mật khẩu không được chứa khoảng trắng')
        .matches(/[a-z]/).withMessage('Mật khẩu phải chứa ít nhất một ký tự chữ thường')
        .matches(/[A-Z]/).withMessage('Mật khẩu phải chứa ít nhất một ký tự chữ in hoa')
        .matches(/[0-9]/).withMessage('Mật khẩu phải chứa ít nhất một ký tự chữ số')
        .matches(/[^A-Za-z0-9\s]/).withMessage('Mật khẩu phải chứa ít nhất một ký tự đặc biệt')
];