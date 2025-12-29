const { sequelize } = require('../config/database');
const { getGHNOrderInfo, updateOrderStatusFromGHN } = require('../service/ghnService');

/**
 * Lấy danh sách đơn hàng của user (kèm sản phẩm)
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

        // Lấy danh sách đơn hàng
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

        // Lấy sản phẩm cho mỗi đơn hàng
        for (let order of orders) {
            const [items] = await sequelize.query(
                `SELECT 
                    oi.quantity,
                    oi.price,
                    p.name_product,
                    p.image
                 FROM order_items oi
                 LEFT JOIN product p ON oi.id_product = p.id_product
                 WHERE oi.order_id = ?
                 LIMIT 3`,
                { replacements: [order.id] }
            );
            order.items = items;
        }

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
 * Tự động sync trạng thái từ GHN nếu đơn chưa hoàn thành
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

        const order = orders[0];

        // TỰ ĐỘNG SYNC: Nếu đơn có mã GHN và chưa hoàn thành, tự động cập nhật trạng thái
        if (order.ghn_order_code && order.status !== 'completed' && order.status !== 'cancelled') {
            try {
                console.log(`Auto-syncing order ${orderId} with GHN...`);
                
                const ghnResult = await getGHNOrderInfo(order.ghn_order_code);
                
                if (ghnResult.success) {
                    const ghnOrderData = ghnResult.data;
                    
                    // Map trạng thái
                    const statusUpdate = await updateOrderStatusFromGHN({
                        OrderCode: ghnOrderData.order_code,
                        Status: ghnOrderData.status,
                        ClientOrderCode: orderId,
                        Type: 'auto_sync'
                    });

                    // Cập nhật vào database
                    await sequelize.query(
                        `UPDATE orders 
                         SET status = ?, 
                             payment_status = ?,
                             updated_at = NOW()
                         WHERE id = ?`,
                        {
                            replacements: [
                                statusUpdate.status,
                                statusUpdate.paymentStatus,
                                orderId
                            ]
                        }
                    );

                    // Cập nhật lại object order với trạng thái mới
                    order.status = statusUpdate.status;
                    order.payment_status = statusUpdate.paymentStatus;
                    
                    console.log(`✅ Auto-synced: ${orderId} → ${statusUpdate.status}`);
                }
            } catch (syncError) {
                console.error('Auto-sync error (non-critical):', syncError.message);
                // Không throw error, vẫn trả về thông tin đơn hàng hiện tại
            }
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
                order: order,
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
