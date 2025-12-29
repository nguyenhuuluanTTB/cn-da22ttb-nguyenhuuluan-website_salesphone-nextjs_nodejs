import { sequelize } from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function get_order_detail(order_id) {
    try {
        // Lấy thông tin đơn hàng
        const [orderInfo] = await sequelize.query(
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
            WHERE o.id = ?
            `,
            {
                replacements: [order_id],
                type: QueryTypes.SELECT
            }
        );

        if (!orderInfo) {
            return {
                success: false,
                message: 'Không tìm thấy đơn hàng'
            };
        }

        // Lấy chi tiết sản phẩm trong đơn hàng
        const [orderItems] = await sequelize.query(
            `
            SELECT 
                oi.id,
                oi.id_product,
                p.name_product,
                p.brand,
                oi.quantity,
                oi.price,
                (oi.quantity * oi.price) as subtotal
            FROM order_items oi
            LEFT JOIN product p ON oi.id_product = p.id_product
            WHERE oi.order_id = ?
            `,
            {
                replacements: [order_id]
            }
        );

        return {
            success: true,
            data: {
                order: orderInfo,
                items: orderItems
            }
        };
    } catch (err) {
        console.error('Error while getting order detail:', err);
        throw err;
    }
}

export default get_order_detail;
