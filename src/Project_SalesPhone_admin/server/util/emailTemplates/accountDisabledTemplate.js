/**
 * Email template for account disabled notification
 * @param {string} userName - Name of the user (optional)
 * @returns {string} - HTML email template
 */
function accountDisabledTemplate(userName = 'Quý khách') {
    return `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tài khoản bị vô hiệu hóa</title>
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
            border-bottom: 3px solid #e74c3c;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #e74c3c;
            margin-bottom: 10px;
        }
        .content {
            padding: 20px 0;
        }
        .alert-box {
            background-color: #fee;
            border-left: 4px solid #e74c3c;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .alert-box strong {
            color: #e74c3c;
        }
        .reasons {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .reasons ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .reasons li {
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
            <h2 style="color: #e74c3c; margin: 0;">Thông báo vô hiệu hóa tài khoản</h2>
        </div>
        
        <div class="content">
            <p>Kính chào ${userName},</p>
            
            <div class="alert-box">
                <p>Chúng tôi xin thông báo rằng <strong>tài khoản SalesPhone của bạn hiện đã bị vô hiệu hóa</strong>.</p>
            </div>
            
            <div class="reasons">
                <p><strong>Nguyên nhân có thể do:</strong></p>
                <ul>
                    <li>Vi phạm điều khoản sử dụng của hệ thống</li>
                    <li>Hoạt động đăng nhập bất thường</li>
                    <li>Thông tin tài khoản chưa được xác thực đầy đủ</li>
                </ul>
            </div>
            
            <p>Trong thời gian tài khoản bị vô hiệu hóa, bạn sẽ <strong>không thể đăng nhập và sử dụng các dịch vụ</strong> trên SalesPhone.</p>
            
            <p>Nếu bạn cho rằng đây là nhầm lẫn hoặc cần hỗ trợ khôi phục tài khoản, vui lòng liên hệ với chúng tôi qua:</p>
            
            <div class="contact-info">
                <p><strong>📧 Email:</strong> <a href="mailto:support@salesphone.vn">support@salesphone.vn</a></p>
                <p><strong>📞 Hotline:</strong> <a href="tel:0374057078">0374.057.078</a></p>
            </div>
            
            <p>Chúng tôi sẵn sàng hỗ trợ và mong sớm giúp bạn tiếp tục sử dụng dịch vụ.</p>
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

export default accountDisabledTemplate;
