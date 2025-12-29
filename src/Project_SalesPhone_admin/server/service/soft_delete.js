import { sequelize } from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function soft_delete_product(id_product){
    try{
        const result = await sequelize.query(
            `
                UPDATE product
                    SET is_del_phone = 1 - is_del_phone
                WHERE id_product = ?
            `,
            {
                replacements: [id_product],
                type: QueryTypes.UPDATE
            }
        );

        return {success: true, message: 'Delete product successfully', result};
    }
    catch(err){
        console.error('Error while delete product: ', err);
        throw err;
    }
    
}

export default soft_delete_product;