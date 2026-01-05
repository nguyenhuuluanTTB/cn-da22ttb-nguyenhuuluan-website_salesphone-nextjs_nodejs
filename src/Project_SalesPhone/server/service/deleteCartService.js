const { sequelize } = require('../config/database');

/**
 * Xóa một sản phẩm khỏi giỏ hàng
 * @param {number} userId 
 * @param {number} id_product 
 */
async function deleteCartItem(userId, id_product) {
    try {
        // Lấy id_cart của user
        const [carts] = await sequelize.query(
            'SELECT id_cart FROM cart WHERE id_user = ?',
            { replacements: [userId] }
        );

        if (carts.length === 0) {
            throw new Error('Giỏ hàng không tồn tại');
        }

        const id_cart = carts[0].id_cart;

        // Xóa sản phẩm khỏi giỏ hàng
        const [result] = await sequelize.query(
            'DELETE FROM cart_product WHERE id_cart = ? AND id_product = ?',
            { replacements: [id_cart, id_product] }
        );

        return result;
    } catch (err) {
        console.error('Error in deleteCartItem:', err);
        throw err;
    }
}

/**
 * Xóa tất cả sản phẩm khỏi giỏ hàng
 * @param {number} userId 
 */
async function deleteAllCartItems(userId) {
    try {
        // Lấy id_cart của user
        const [carts] = await sequelize.query(
            'SELECT id_cart FROM cart WHERE id_user = ?',
            { replacements: [userId] }
        );

        if (carts.length === 0) {
            throw new Error('Giỏ hàng không tồn tại');
        }

        const id_cart = carts[0].id_cart;

        // Xóa tất cả sản phẩm trong giỏ hàng
        const [result] = await sequelize.query(
            'DELETE FROM cart_product WHERE id_cart = ?',
            { replacements: [id_cart] }
        );

        return result;
    } catch (err) {
        console.error('Error in deleteAllCartItems:', err);
        throw err;
    }
}

module.exports = {
    deleteCartItem,
    deleteAllCartItems
};
