import { sequelize } from '../config/database.js';

export default async function addToCart_TruyVan(id_cart, id_product, quantity){
    try{
        const query = `
            INSERT INTO cart_product(id_cart, id_product, quantity)
            VALUES (?, ?, ?)
        `;
         const [result] = await sequelize.query(query, {
            replacements: [id_cart, id_product, quantity]
        });
        return result;
    }
    catch(err){
        console.error(err);
        throw err;
    }
}

