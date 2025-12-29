import { sequelize } from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function update_order_status(order_id, status) {
    try {
        await sequelize.query(
            `
            UPDATE orders
            SET status = ?
            WHERE id = ?
            `,
            {
                replacements: [status, order_id],
                type: QueryTypes.UPDATE
            }
        );

        return {
            success: true,
            message: 'Cập nhật trạng thái đơn hàng thành công'
        };
    } catch (err) {
        console.error('Error while updating order status:', err);
        throw err;
    }
}

export default update_order_status;
