const { deleteCartItem, deleteAllCartItems } = require('../service/deleteCartService');

/**
 * Xóa một sản phẩm khỏi giỏ hàng
 */
exports.deleteItem = async (req, res) => {
    try {
        const { id_product } = req.body;
        const userId = req.user.id;

        if (!id_product) {
            return res.status(400).json({
                success: false,
                message: 'Missing product ID'
            });
        }

        await deleteCartItem(userId, id_product);

        return res.json({
            success: true,
            message: 'Đã xóa sản phẩm khỏi giỏ hàng'
        });
    } catch (err) {
        console.error('Delete cart item error:', err);
        return res.status(500).json({
            success: false,
            message: err.message || 'Server error'
        });
    }
};

/**
 * Xóa tất cả sản phẩm khỏi giỏ hàng
 */
exports.deleteAll = async (req, res) => {
    try {
        const userId = req.user.id;

        await deleteAllCartItems(userId);

        return res.json({
            success: true,
            message: 'Đã xóa tất cả sản phẩm khỏi giỏ hàng'
        });
    } catch (err) {
        console.error('Delete all cart items error:', err);
        return res.status(500).json({
            success: false,
            message: err.message || 'Server error'
        });
    }
};
