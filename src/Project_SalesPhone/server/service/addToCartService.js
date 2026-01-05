const { sequelize } = require('../config/database');

/**
 * Tìm hoặc tạo cart cho user
 * @param {number} userId 
 * @returns {Promise<number>} id_cart
 */
async function getOrCreateCart(userId) {
    try {
        // Tìm cart của user
        const [carts] = await sequelize.query(
            'SELECT id_cart FROM cart WHERE id_user = ?',
            { replacements: [userId] }
        );

        // Nếu đã có cart, trả về id_cart
        if (carts.length > 0) {
            return carts[0].id_cart;
        }

        // Nếu chưa có cart, tạo mới
        const [result] = await sequelize.query(
            'INSERT INTO cart (id_user, created_at) VALUES (?, NOW())',
            { replacements: [userId] }
        );

        return result; // insertId
    } catch (err) {
        console.error('Error in getOrCreateCart:', err);
        throw err;
    }
}

/**
 * Thêm sản phẩm vào giỏ hàng
 * @param {number} userId 
 * @param {number} id_product 
 * @param {number} quantity 
 */
async function addToCart_TruyVan(userId, id_product, quantity){
    try{
        // Bước 1: Lấy hoặc tạo cart cho user
        const id_cart = await getOrCreateCart(userId);

        // Bước 2: Thêm sản phẩm vào cart
        const query = `
            INSERT INTO cart_product(id_cart, id_product, quantity)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = quantity + ?
        `;
        const [result] = await sequelize.query(query, {
            replacements: [id_cart, id_product, quantity, quantity]
        });
        return result;
    }
    catch(err){
        console.error('Error in addToCart_TruyVan:', err);
        throw err;
    }
}

module.exports = addToCart_TruyVan;
