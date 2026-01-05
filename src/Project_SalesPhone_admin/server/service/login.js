import { sequelize } from '../config/database.js';
import crypto from 'crypto';

async function loginUser(username, password) {
    try {
        // Hash password with MD5
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
        
        const rows = await sequelize.query(
            `
                SELECT ua.id_user, ua.name, ua.role
                FROM user_account ua
                WHERE ua.name = :username 
                AND ua.password = :password
                AND ua.role = 'admin'
            `,
            {
                replacements: { username, password: hashedPassword },
                type: sequelize.QueryTypes.SELECT
            }
        );

        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        console.error('Login query error: ', err);
        throw err;
    }
}

export default loginUser;
