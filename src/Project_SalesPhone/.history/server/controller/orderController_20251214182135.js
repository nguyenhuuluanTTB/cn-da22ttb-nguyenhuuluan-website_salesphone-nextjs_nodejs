const { sequelize } = require('../config/database');
const { createGHNOrder, updateOrderStatusFromGHN } = require('../service/ghnService');

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
                    `INSERT INTO order_items (order_id, id_product, quantity, price)
                     VALUES (?, ?, ?, ?)`,
                    {
                        replacements: [
                            orderId,
                            product.id_product,
                            product.quantity,
                            product.price
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

            // 5. Tạo đơn hàng trên Giao Hàng Nhanh (nếu COD)
            let ghnOrderCode = null;
            if (paymentMethod === 'cod') {
                try {
                    console.log('Starting GHN order creation for:', orderId);
                    
                    // Lấy thông tin sản phẩm để gửi GHN
                    const [productDetails] = await sequelize.query(
                        `SELECT p.name_product, p.id_product FROM product p WHERE p.id_product IN (?)`,
                        { replacements: [products.map(p => p.id_product)] }
                    );

                    const productMap = {};
                    productDetails.forEach(p => {
                        productMap[p.id_product] = p.name_product;
                    });

                    const ghnItems = products.map(p => ({
                        id_product: p.id_product,
                        name: productMap[p.id_product] || 'Sản phẩm',
                        code: p.id_product.toString(),
                        quantity: p.quantity,
                        price: p.price
                    }));

                    const ghnOrderData = {
                        orderId,
                        receiverName: receiverInfo.name,
                        receiverPhone: receiverInfo.phone,
                        receiverAddress: `${shippingAddress.detail}, ${shippingAddress.ward}, ${shippingAddress.district}, ${shippingAddress.province}`,
                        provinceId: shippingAddress.provinceId,
                        districtId: shippingAddress.districtId,
                        wardCode: shippingAddress.wardCode,
                        items: ghnItems,
                        codAmount: totalAmount,
                        shippingFee: shippingFee,
                        note: ''
                    };

                    console.log('GHN Order Data:', JSON.stringify(ghnOrderData, null, 2));
                    
                    const ghnResult = await createGHNOrder(ghnOrderData);
                    
                    console.log('GHN Result:', JSON.stringify(ghnResult, null, 2));

                    if (ghnResult.success) {
                        ghnOrderCode = ghnResult.data.order_code;
                        // Cập nhật mã vận đơn GHN vào database
                        await sequelize.query(
                            'UPDATE orders SET ghn_order_code = ? WHERE id = ?',
                            { replacements: [ghnOrderCode, orderId] }
                        );
                        console.log('✓ GHN order created successfully:', ghnOrderCode);
                        
                        // AUTO-UPDATE: Tự động đánh dấu "đã giao hàng" cho môi trường test
                        console.log('🔄 Auto-updating order status to completed...');
                        await sequelize.query(
                            'UPDATE orders SET status = ?, payment_status = ?, updated_at = NOW() WHERE id = ?',
                            { replacements: ['completed', 'paid', orderId] }
                        );
                        console.log('✅ Order automatically marked as completed (for testing)');
                        
                    } else {
                        console.error('✗ Failed to create GHN order:', ghnResult.message);
                    }
                } catch (ghnError) {
                    console.error('✗ GHN integration error:', ghnError.message);
                    console.error('Full error:', ghnError);
                    // Không throw error, đơn hàng vẫn được tạo thành công
                }
            }

            return res.json({
                success: true,
                message: paymentMethod === 'cod' 
                    ? 'Đặt hàng thành công' + (ghnOrderCode ? '. Đơn hàng đã được đồng bộ với GHN' : '')
                    : 'Đơn hàng đã được tạo, vui lòng thanh toán',
                data: {
                    orderId,
                    paymentMethod,
                    totalAmount,
                    ghnOrderCode
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

/**
 * Webhook nhận callback từ Giao Hàng Nhanh khi trạng thái đơn hàng thay đổi
 */
exports.ghnWebhook = async (req, res) => {
    try {
        console.log('GHN Webhook received:', JSON.stringify(req.body, null, 2));

        const webhookData = req.body;
        
        // Parse thông tin từ webhook
        const statusUpdate = await updateOrderStatusFromGHN(webhookData);
        
        if (!statusUpdate || !statusUpdate.orderId) {
            console.error('Invalid webhook data');
            return res.status(400).json({ success: false, message: 'Invalid data' });
        }

        // Cập nhật trạng thái trong database
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
                    statusUpdate.orderId
                ]
            }
        );

        console.log(`Order ${statusUpdate.orderId} updated to status: ${statusUpdate.status}`);

        // Trả về response cho GHN
        return res.json({
            success: true,
            message: 'Webhook processed successfully'
        });

    } catch (error) {
        console.error('GHN webhook error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
