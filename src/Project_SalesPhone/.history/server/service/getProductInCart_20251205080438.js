const {sequelize} = require('../config/database');

async function get_ProductInCart_TruyVan (id_cart) {
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
                pr.percent,
                img.image_url
                

            FROM cart_product AS cp
            LEFT JOIN product AS p ON cp.id_product = p.id_product
            LEFT JOIN detail_product AS d ON p.id_product = d.id_product
            LEFT JOIN promotion AS pr ON p.id_promotion = pr.id_promotion
            LEFT JOIN product_image AS img ON p.id_product = img.id_product
            WHERE cp.id_cart = ?
            `,
            {replacements: [id_cart]}
        );
        
        return rows;
    }
    catch(err){
        console.error("DB query error: ", err);
        return[];
    }
}

module.exports = get_ProductInCart_TruyVan;