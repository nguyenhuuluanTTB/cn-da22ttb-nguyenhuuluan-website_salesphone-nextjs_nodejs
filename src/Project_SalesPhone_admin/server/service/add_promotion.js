import { sequelize } from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function add_promotion(data) {
    try {
        const [result] = await sequelize.query(
            `
            INSERT INTO promotion 
            (name_promotion, percent, start_at, end_at, describe_promotion, image_pro, is_del_pro)
            VALUES (?, ?, ?, ?, ?, ?, 0)
            `,
            {
                replacements: [
                    data.name_promotion,
                    data.percent,
                    data.start_at,
                    data.end_at,
                    data.describe_promotion,
                    data.image_pro || null
                ],
                type: QueryTypes.INSERT
            }
        );

        return {
            success: true,
            message: 'Thêm khuyến mãi thành công',
            data: { id_promotion: result }
        };
    } catch (err) {
        console.error('Error while adding promotion:', err);
        throw err;
    }
}

export default add_promotion;
