const {sequelize} = require('../config/database');

module.exports = async function addToCart_TruyVan(id_cart, id_product, quantity){
    try{
        const query = `
            INSERT INTO cart_product(id_cart, id_product, quantity)
            VALUES (?, ?, ?)
        `;
         const [result] = await db.execute(query, [id_cart, id_product, quantity]);
        return result; 
    }
    catch(err){
        console.error(err);
        throw err;
    }
}