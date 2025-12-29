const { sequelize } = require('../config/database');

module.exports = async function getProductSales50 () {
    try{
        const [rows] = sequelize.query(
            `
                    SELECT 
                    p.id_product,
                    p.name_product,
                    p.price,
                    p.type,
                    p.brand,
                    p.quantity,
                    p.status,
                    p.id_promotion,
                    p.product_code,
                    p.rate,
                    d.description_phone,
                    d.screen_size,
                    d.ram,
                    d.rom,
                    i.image_url,
                    j.percent
                FROM product AS p
                LEFT JOIN detail_product AS d 
                    ON p.id_product = d.id_product
                LEFT JOIN product_image AS i
                    ON p.id_product = i.id_product
                LEFT JOIN promotion AS j
                    ON p.id_promotion = j.id_promotion
                WHERE j.percent > 50 OR j.percent == 50
                ORDER BY p.id_product DESC
                LIMIT 15;
            `
        );
        return rows;
    }
    catch(err){
        console.error("DB query error: ", err);
    }
}