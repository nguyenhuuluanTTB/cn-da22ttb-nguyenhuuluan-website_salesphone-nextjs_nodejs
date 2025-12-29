import { sequelize } from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function soft_delete_promotion(id_promotion) {
    try {
        const result = await sequelize.query(
            `
            UPDATE promotion
            SET is_del_pro = 1 - is_del_pro
            WHERE id_promotion = ?
            `,
            {
                replacements: [id_promotion],
                type: QueryTypes.UPDATE
            }
        );

        return {
            success: true,
            message: 'Xóa/Khôi phục khuyến mãi thành công',
            result
        };
    } catch (err) {
        console.error('Error while soft deleting promotion:', err);
        throw err;
    }
}

export default soft_delete_promotion;
