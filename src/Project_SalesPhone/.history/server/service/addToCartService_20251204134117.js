const { sequelize } = require('../config/database');

async function addToCart_TruyVan(id_cart, id_product, quantity){
    try{
        const query = `
            INSERT INTO cart_product(id_cart, id_product, quantity)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
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

module.exports = addToCart_TruyVan;
