const { sequelize } = require('../config/database');

/**
 * Tạo đơn hàng (COD hoặc chờ thanh toán chuyển khoản)
 */
exports.createOrder = async (req, res) => {
    try {
        const { 
            products,           // Danh sách sản phẩm: [{id_product, quantity, price}]
            paymentMethod,      // 'cod' hoặc 'bank_transfer'
            receiverInfo,       // Thông tin người nhận: {name, phone}
            shippingAddress,    // Địa chỉ giao hàng
            shippingFee,        // Phí vận chuyển
            totalAmount         // Tổng tiền (bao gồm phí ship)
        } = req.body;

        const userId = req.user?.id;

        if (!userId || !products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin đơn hàng'
            });
        }

        // Tạo mã đơn hàng
        const orderId = 'DH' + Date.now();

        // Bắt đầu transaction với Sequelize
        const transaction = await sequelize.transaction();

        try {
            // 1. Tạo đơn hàng
            const paymentStatus = paymentMethod === 'cod' ? 'pending' : 'waiting';
            const orderStatus = paymentMethod === 'cod' ? 'confirmed' : 'pending';

            await sequelize.query(
                `INSERT INTO orders (id, id_user, receiver_name, shipping_phone, total_amount, shipping_fee, shipping_address, 
                 payment_method, payment_status, status, created_at, updated_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [
                        orderId,
                        userId,
                        receiverInfo?.name || '',
                        receiverInfo?.phone || '',
                        totalAmount,
                        shippingFee || 0,
                        JSON.stringify(shippingAddress),
                        paymentMethod,
                        paymentStatus,
                        orderStatus
                    ],
                    transaction
                }
            );

            // 2. Tạo chi tiết đơn hàng
            for (const product of products) {
                await sequelize.query(
                    `INSERT INTO order_items (order_id, id_product, quantity, price, subtotal)
                     VALUES (?, ?, ?, ?, ?)`,
                    {
                        replacements: [
                            orderId,
                            product.id_product,
                            product.quantity,
                            product.price,
                            product.price * product.quantity
                        ],
                        transaction
                    }
                );

                // 3. Giảm số lượng sản phẩm trong kho (chỉ với COD)
                if (paymentMethod === 'cod') {
                    await sequelize.query(
                        `UPDATE product SET quantity = quantity - ? WHERE id_product = ?`,
                        {
                            replacements: [product.quantity, product.id_product],
                            transaction
                        }
                    );
                }

                // 4. Xóa sản phẩm khỏi giỏ hàng
                const [cartResult] = await sequelize.query(
                    'SELECT id_cart FROM cart WHERE id_user = ?',
                    { replacements: [userId], transaction }
                );

                if (cartResult && cartResult.length > 0) {
                    const cartId = cartResult[0].id_cart;
                    await sequelize.query(
                        'DELETE FROM cart_product WHERE id_cart = ? AND id_product = ?',
                        {
                            replacements: [cartId, product.id_product],
                            transaction
                        }
                    );
                }
            }

            // Commit transaction
            await transaction.commit();

            return res.json({
                success: true,
                message: paymentMethod === 'cod' 
                    ? 'Đặt hàng thành công' 
                    : 'Đơn hàng đã được tạo, vui lòng thanh toán',
                data: {
                    orderId,
                    paymentMethod,
                    totalAmount
                }
            });

        } catch (error) {
            // Rollback nếu có lỗi
            await transaction.rollback();
            throw error;
        }

    } catch (error) {
        console.error('Create order error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi tạo đơn hàng: ' + error.message
        });
    }
};
