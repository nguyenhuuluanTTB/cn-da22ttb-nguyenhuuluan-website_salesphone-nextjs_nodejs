const { sequelize } = require('../config/database');

module.exports = async function getNewPhone_TruyVan () {
    try{
        const [rows] = await sequelize.query(
            `SELECT id_product, name_product, price, type, brand, quantity, status, id_promotion, product_code
             FROM product
             ORDER BY created_at ASC  -- ASC để lấy sản phẩm cũ nhất
             LIMIT 15`
        );
        return rows;
    }
    catch(err){
        console.error("DB query error: ", err);
        return [];
    }
}