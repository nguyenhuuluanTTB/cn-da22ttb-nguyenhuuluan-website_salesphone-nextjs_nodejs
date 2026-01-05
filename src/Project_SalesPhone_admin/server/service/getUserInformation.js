import { sequelize } from '../config/database.js';

async function getUserInformation(id_user) {
    try {
        const [rows] = await sequelize.query(
            `
            SELECT * FROM user_information WHERE id_user = :id_user
            `,
            { replacements: { id_user }, type: sequelize.QueryTypes?.SELECT }
        );

        return rows;
    } catch (err) {
        console.error('Error while getting user information:', err);
        throw err;
    }
}

export default getUserInformation;
