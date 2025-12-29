import { sequelize } from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function get_promotion_detail(id_promotion) {
    try {
        const [rows] = await sequelize.query(
            `
            SELECT * FROM promotion
            WHERE id_promotion = ?
            `,
            {
                replacements: [id_promotion],
                type: QueryTypes.SELECT
            }
        );

        if (!rows) {
            return {
                success: false,
                message: 'Không tìm thấy khuyến mãi'
            };
        }

        return {
            success: true,
            data: rows
        };
    } catch (err) {
        console.error('Error while getting promotion detail:', err);
        throw err;
    }
}

export default get_promotion_detail;
