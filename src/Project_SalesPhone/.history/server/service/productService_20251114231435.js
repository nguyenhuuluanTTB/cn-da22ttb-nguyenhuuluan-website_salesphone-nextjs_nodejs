const { sequelize } = require('../config/database');

module.exports = async function getNewPhone_TruyVan () {
    try{
        const [rows] = await sequelize.query(
            // `SELECT id_product, name_product, price, type, brand, quantity, status, id_promotion, product_code
            //  FROM product
            //  ORDER BY id_product DESC  -- DESC để lấy sản phẩm mới nhất
            //  LIMIT 15`
            `SELECT 
                p.id_product,
                p.name_product,
                p.price,
                p.type,
                p.brand,
                p.quantity,
                p.status,
                p.id_promotion,
                p.product_code,
                d.description,
                d.specifications,
                d.image_url
            FROM product AS p
            LEFT JOIN detail_product AS d 
                ON p.id_product = d.id_product
            ORDER BY p.id_product DESC
            LIMIT 15;
            `
        );
        return rows;
    }
    catch(err){
        console.error("DB query error: ", err);
        return [];
    }
}