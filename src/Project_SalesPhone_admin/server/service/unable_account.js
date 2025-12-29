import { sequelize } from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function unable_account_tryvan(id_user) {
    try {
        // First, get user email
        const userResult = await sequelize.query(
            `
                SELECT email 
                FROM user_account
                WHERE id_user = ?
            `,
            {
                replacements: [id_user],
                type: QueryTypes.SELECT
            }
        );

        if (!userResult || userResult.length === 0) {
            throw new Error('User not found');
        }

        const userEmail = userResult[0].email;

        // Then update account status
        const result = await sequelize.query(
            `
                UPDATE user_account 
                SET enable = 0
                WHERE id_user = ?
            `,
            {
                replacements: [id_user],
                type: QueryTypes.UPDATE
            }
        );

        return { result, email: userEmail };
    }
    catch (err) {
        console.error('DB query error: ', err);
        throw err;
    }
};

export default unable_account_tryvan;
