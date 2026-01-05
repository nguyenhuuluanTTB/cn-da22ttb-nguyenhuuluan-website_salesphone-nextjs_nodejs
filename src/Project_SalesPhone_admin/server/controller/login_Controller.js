import loginUser from '../service/login.js';
import jwt from 'jsonwebtoken';

const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập tên đăng nhập và mật khẩu'
            });
        }

        // Check credentials
        const user = await loginUser(username, password);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id_user: user.id_user, 
                username: user.name,
                role: user.role 
            },
            process.env.JWT_SECRET || 'salesphone_secret_key',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            token,
            user: {
                id_user: user.id_user,
                username: user.name,
                role: user.role
            }
        });

    } catch (err) {
        console.error('Login controller error:', err);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi đăng nhập'
        });
    }
};

export default loginController;
