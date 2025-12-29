import { sequelize } from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function get_all_orders() {
    try {
        const [rows] = await sequelize.query(
            `
            SELECT 
                o.id,
                o.id_user,
                u.name as username,
                u.email,
                o.total_amount,
                o.status,
                o.payment_status,
                o.receiver_name,
                o.shipping_phone,
                o.shipping_address,
                o.note,
                o.created_at,
                o.updated_at
            FROM orders o
            LEFT JOIN user_account u ON o.id_user = u.id_user
            ORDER BY o.created_at DESC
            `
        );

        return {
            success: true,
            data: rows
        };
    } catch (err) {
        console.error('Error while getting orders:', err);
        throw err;
    }
}

export default get_all_orders;
