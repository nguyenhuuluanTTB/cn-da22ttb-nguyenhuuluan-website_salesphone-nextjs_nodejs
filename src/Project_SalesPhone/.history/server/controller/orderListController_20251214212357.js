const { sequelize } = require('../config/database');
const { getGHNOrderInfo, updateOrderStatusFromGHN } = require('../service/ghnService');

/**
 * Lấy danh sách đơn hàng của user
 */
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found'
            });
        }

        const [orders] = await sequelize.query(
            `SELECT 
                o.id,
                o.total_amount,
                o.shipping_fee,
                o.status,
                o.payment_status,
                o.payment_method,
                o.receiver_name,
                o.shipping_phone,
                o.shipping_address,
                o.ghn_order_code,
                o.created_at,
                o.updated_at
             FROM orders o
             WHERE o.id_user = ?
             ORDER BY o.created_at DESC`,
            { replacements: [userId] }
        );

        return res.json({
            success: true,
            data: orders
        });

    } catch (error) {
        console.error('Get user orders error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Lấy chi tiết một đơn hàng
 */
exports.getOrderDetail = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found'
            });
        }

        // Lấy thông tin đơn hàng
        const [orders] = await sequelize.query(
            `SELECT 
                o.*
             FROM orders o
             WHERE o.id = ? AND o.id_user = ?`,
            { replacements: [orderId, userId] }
        );

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Lấy chi tiết sản phẩm
        const [items] = await sequelize.query(
            `SELECT 
                oi.*,
                p.name_product,
                p.image
             FROM order_items oi
             LEFT JOIN product p ON oi.id_product = p.id_product
             WHERE oi.order_id = ?`,
            { replacements: [orderId] }
        );

        return res.json({
            success: true,
            data: {
                order: orders[0],
                items: items
            }
        });

    } catch (error) {
        console.error('Get order detail error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
