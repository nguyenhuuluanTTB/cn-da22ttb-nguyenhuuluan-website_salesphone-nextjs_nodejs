/**
 * Email template for account enabled notification
 * @param {string} userName - Name of the user (optional)
 * @returns {string} - HTML email template
 */
function accountEnabledTemplate(userName = 'Quý khách') {
    return `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tài khoản được kích hoạt</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 3px solid #27ae60;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #27ae60;
            margin-bottom: 10px;
        }
        .content {
            padding: 20px 0;
        }
        .success-box {
            background-color: #efffef;
            border-left: 4px solid #27ae60;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .success-box strong {
            color: #27ae60;
        }
        .features {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .features ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .features li {
            margin: 8px 0;
        }
        .tips {
            background-color: #fff9e6;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            border-left: 4px solid #f39c12;
        }
        .tips ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .tips li {
            margin: 8px 0;
        }
        .contact-info {
            background-color: #e8f4f8;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .contact-info p {
            margin: 8px 0;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 14px;
        }
        a {
            color: #3498db;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">SalesPhone</div>
            <h2 style="color: #27ae60; margin: 0;">Tài khoản đã được kích hoạt</h2>
        </div>
        
        <div class="content">
            <p>Kính chào ${userName},</p>
            
            <div class="success-box">
                <p>Chúng tôi xin thông báo rằng <strong>tài khoản SalesPhone của bạn đã được kích hoạt trở lại</strong> sau quá trình kiểm tra và xác minh.</p>
            </div>
            
            <div class="features">
                <p><strong>Hiện tại, bạn có thể:</strong></p>
                <ul>
                    <li>Đăng nhập và sử dụng đầy đủ các dịch vụ trên SalesPhone</li>
                    <li>Tiếp tục mua sắm, theo dõi đơn hàng và quản lý tài khoản như bình thường</li>
                </ul>
            </div>
            
            <div class="tips">
                <p><strong>Để đảm bảo tài khoản luôn hoạt động ổn định và an toàn, vui lòng:</strong></p>
                <ul>
                    <li>Không chia sẻ thông tin đăng nhập cho người khác</li>
                    <li>Cập nhật đầy đủ và chính xác thông tin cá nhân</li>
                    <li>Tuân thủ các điều khoản sử dụng của hệ thống</li>
                </ul>
            </div>
            
            <p>Nếu bạn cần hỗ trợ thêm hoặc gặp bất kỳ khó khăn nào trong quá trình sử dụng, đừng ngần ngại liên hệ với chúng tôi qua:</p>
            
            <div class="contact-info">
                <p><strong>📧 Email:</strong> <a href="mailto:support@salesphone.vn">support@salesphone.vn</a></p>
                <p><strong>📞 Hotline:</strong> <a href="tel:0374057078">0374.057.078</a></p>
            </div>
            
            <p>Cảm ơn bạn đã hợp tác và tiếp tục tin tưởng SalesPhone.</p>
        </div>
        
        <div class="footer">
            <p><strong>Trân trọng,</strong></p>
            <p>SalesPhone Support Team</p>
            <p style="font-size: 12px; color: #999; margin-top: 15px;">
                Email này được gửi tự động, vui lòng không trả lời trực tiếp.
            </p>
        </div>
    </div>
</body>
</html>
    `;
}

export default accountEnabledTemplate;
