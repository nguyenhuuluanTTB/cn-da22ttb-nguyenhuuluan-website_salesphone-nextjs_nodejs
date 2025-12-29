const { sequelize } = require('../config/database');

exports.updateCartQuantity = async (req, res) => {
    try {
        const { id_product, quantity } = req.body;
        const user_id = req.user.id;

        if (!id_product || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Thiếu thông tin sản phẩm hoặc số lượng",
            });
        }

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Số lượng phải lớn hơn 0",
            });
        }

        // Kiểm tra số lượng tồn kho
        const [productStock] = await sequelize.query(
            'SELECT quantity FROM product WHERE id_product = ?',
            { replacements: [id_product] }
        );

        if (!productStock || productStock.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sản phẩm",
            });
        }

        const availableStock = productStock[0].quantity;

        if (quantity > availableStock) {
            return res.status(400).json({
                success: false,
                message: `Số lượng vượt quá tồn kho. Còn lại: ${availableStock} sản phẩm`,
                availableStock: availableStock
            });
        }

        // Lấy id_cart của user
        const [cartResult] = await sequelize.query(
            'SELECT id_cart FROM cart WHERE id_user = ?',
            { replacements: [user_id] }
        );

        if (!cartResult || cartResult.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy giỏ hàng",
            });
        }

        const id_cart = cartResult[0].id_cart;

        // Cập nhật số lượng
        await sequelize.query(
            'UPDATE cart_product SET quantity = ? WHERE id_cart = ? AND id_product = ?',
            { replacements: [quantity, id_cart, id_product] }
        );

        return res.json({
            success: true,
            message: 'Cập nhật số lượng thành công',
        });
    } catch (err) {
        console.error('Error updating cart quantity:', err);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server khi cập nhật giỏ hàng'
        });
    }
};
