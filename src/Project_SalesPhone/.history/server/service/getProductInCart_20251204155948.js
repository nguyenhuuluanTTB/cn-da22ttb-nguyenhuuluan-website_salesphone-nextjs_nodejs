const {sequelize} = require('../config/database');

module.exports = async function get_ProductInCart_TruyVan (id_cart) {
    try{
        const [rows] = await sequelize.query(
            `
            SELECT 
                cp.id_cart,
                cp.id_product,
                cp.quantity,
                p.name_product,
                p.price,
                d.rom,
                d.color,
                pr.percent

            FROM cart_product AS cp
            LEFT JOIN product AS p ON cp.id_product = p.id_product
            LEFT JOIN detail_product AS d ON p.id_product = d.id_product
            LEFT JOIN promotion AS pr ON p.id_promotion = pr.id_promotion
            WHERE cp.id_cart = ?
            `
        );
        const result = await sequelize.query(rows, {
            replacements: [id_cart]
        });
        return result;
    }
    catch(err){
        console.error("DB query error: ", err);
        return[];
    }
}