import { sequelize } from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function update_payment_status(order_id, payment_status) {
    try {
        await sequelize.query(
            `
            UPDATE orders
            SET payment_status = ?
            WHERE id = ?
            `,
            {
                replacements: [payment_status, order_id],
                type: QueryTypes.UPDATE
            }
        );

        return {
            success: true,
            message: 'Cập nhật trạng thái thanh toán thành công'
        };
    } catch (err) {
        console.error('Error while updating payment status:', err);
        throw err;
    }
}

export default update_payment_status;
