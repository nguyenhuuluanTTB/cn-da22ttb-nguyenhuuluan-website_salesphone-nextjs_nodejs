const { sequelize } = require('../config/database');
const { createGHNOrder, updateOrderStatusFromGHN, getGHNOrderInfo, generatePrintToken } = require('../service/ghnService');

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
            const paymentStatus = 'pending'; // Luôn pending cho đến khi giao hàng thành công
            const orderStatus = 'pending'; // Chờ GHN xác nhận và cập nhật

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
 * GHN sẽ gửi POST request với format:
 * - Type: create, switch_status, update_weight, update_cod, update_fee
 * - OrderCode: Mã vận đơn GHN
 * - Status: ready_to_pick, picking, picked, delivering, delivered, return, cancel, etc
 * - ClientOrderCode: Mã đơn hàng của shop
 * Phải trả về Response code 200, nếu không GHN sẽ gửi lại 10 lần
 */
exports.ghnWebhook = async (req, res) => {
    try {
        console.log('========== GHN WEBHOOK RECEIVED ==========')
        console.log('Timestamp:', new Date().toISOString());
        console.log('Request Body:', JSON.stringify(req.body, null, 2));
        console.log('==========================================')

        const webhookData = req.body;
        
        // Kiểm tra dữ liệu webhook
        if (!webhookData.OrderCode) {
            console.error('Missing OrderCode in webhook data');
            // Vẫn trả về 200 để GHN không gửi lại
            return res.status(200).json({ 
                success: false, 
                message: 'Missing OrderCode' 
            });
        }
        
        // Parse thông tin từ webhook
        const statusUpdate = await updateOrderStatusFromGHN(webhookData);
        
        console.log('Status update parsed:', statusUpdate);

        // Tìm order bằng ghn_order_code hoặc id
        let orderId = statusUpdate.orderId;
        
        // Nếu không có ClientOrderCode, tìm bằng ghn_order_code
        if (!orderId) {
            const [orders] = await sequelize.query(
                `SELECT id FROM orders WHERE ghn_order_code = ? LIMIT 1`,
                {
                    replacements: [statusUpdate.ghnOrderCode]
                }
            );
            
            if (orders.length > 0) {
                orderId = orders[0].id;
                console.log('Found order by ghn_order_code:', orderId);
            }
        }
        
        if (!orderId) {
            console.error('Order not found for GHN order code:', statusUpdate.ghnOrderCode);
            // Vẫn trả về 200 để GHN không gửi lại
            return res.status(200).json({ 
                success: false, 
                message: 'Order not found' 
            });
        }

        // Cập nhật trạng thái trong database
        const [result] = await sequelize.query(
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

        console.log(`✅ Order ${orderId} updated successfully`);
        console.log(`   - Status: ${statusUpdate.status}`);
        console.log(`   - Payment: ${statusUpdate.paymentStatus}`);
        console.log(`   - GHN Status: ${statusUpdate.ghnStatus}`);
        console.log(`   - Type: ${statusUpdate.webhookType}`);

        // QUAN TRỌNG: Phải trả về Response code 200
        // Nếu không, GHN sẽ gửi lại 10 lần, mỗi lần cách 5 giây
        return res.status(200).json({
            success: true,
            message: 'Webhook processed successfully',
            orderId: orderId
        });

    } catch (error) {
        console.error('❌ GHN webhook error:', error);
        // Vẫn trả về 200 để tránh GHN gửi lại liên tục
        return res.status(200).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Cập nhật trạng thái đơn hàng từ GHN (chủ động lấy thông tin)
 * API này sẽ gọi GHN để lấy thông tin mới nhất và cập nhật vào CSDL
 */
exports.syncOrderStatusFromGHN = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user?.id;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu mã đơn hàng'
            });
        }

        // Lấy thông tin đơn hàng từ database
        const [orders] = await sequelize.query(
            `SELECT id, ghn_order_code, user_id, status, payment_status 
             FROM orders 
             WHERE id = ?`,
            { replacements: [orderId] }
        );

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn hàng'
            });
        }

        const order = orders[0];

        // Kiểm tra quyền truy cập
        if (order.user_id !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Không có quyền truy cập đơn hàng này'
            });
        }

        // Kiểm tra xem có mã GHN không
        if (!order.ghn_order_code) {
            return res.status(400).json({
                success: false,
                message: 'Đơn hàng chưa được đồng bộ với GHN'
            });
        }

        console.log(`Fetching GHN order info for: ${order.ghn_order_code}`);

        // Lấy thông tin từ GHN
        const ghnResult = await getGHNOrderInfo(order.ghn_order_code);

        if (!ghnResult.success) {
            return res.status(500).json({
                success: false,
                message: 'Không thể lấy thông tin từ GHN: ' + ghnResult.message
            });
        }

        const ghnOrderData = ghnResult.data;
        console.log('GHN Order Data:', JSON.stringify(ghnOrderData, null, 2));

        // Map trạng thái GHN sang trạng thái hệ thống
        const statusUpdate = await updateOrderStatusFromGHN({
            OrderCode: ghnOrderData.order_code,
            Status: ghnOrderData.status,
            ClientOrderCode: orderId,
            Type: 'manual_sync',
            CODAmount: ghnOrderData.cod_amount,
            TotalFee: ghnOrderData.total_fee,
            Description: `Đồng bộ thủ công từ GHN`
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

        console.log(`✅ Order ${orderId} synced successfully`);
        console.log(`   - Old Status: ${order.status} → New: ${statusUpdate.status}`);
        console.log(`   - Old Payment: ${order.payment_status} → New: ${statusUpdate.paymentStatus}`);
        console.log(`   - GHN Status: ${statusUpdate.ghnStatus}`);

        return res.json({
            success: true,
            message: 'Cập nhật trạng thái thành công',
            data: {
                orderId: orderId,
                oldStatus: order.status,
                newStatus: statusUpdate.status,
                oldPaymentStatus: order.payment_status,
                newPaymentStatus: statusUpdate.paymentStatus,
                ghnStatus: statusUpdate.ghnStatus,
                ghnOrderCode: order.ghn_order_code
            }
        });

    } catch (error) {
        console.error('❌ Sync order status error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi đồng bộ trạng thái: ' + error.message
        });
    }
};

/**
 * Lấy link in đơn hàng từ GHN
 * Token có hiệu lực 30 phút
 */
exports.getPrintOrderUrl = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user?.id;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu mã đơn hàng'
            });
        }

        // Lấy thông tin đơn hàng từ database
        const [orders] = await sequelize.query(
            `SELECT id, ghn_order_code, user_id 
             FROM orders 
             WHERE id = ?`,
            { replacements: [orderId] }
        );

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn hàng'
            });
        }

        const order = orders[0];

        // Kiểm tra quyền truy cập
        if (order.user_id !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Không có quyền truy cập đơn hàng này'
            });
        }

        // Kiểm tra xem có mã GHN không
        if (!order.ghn_order_code) {
            return res.status(400).json({
                success: false,
                message: 'Đơn hàng chưa được đồng bộ với GHN'
            });
        }

        console.log(`Generating print token for GHN order: ${order.ghn_order_code}`);

        // Tạo token in từ GHN
        const printResult = await generatePrintToken([order.ghn_order_code]);

        if (!printResult.success) {
            return res.status(500).json({
                success: false,
                message: 'Không thể tạo link in: ' + printResult.message
            });
        }

        console.log('✅ Print URLs generated:', printResult.data.printUrls);

        return res.json({
            success: true,
            message: 'Lấy link in thành công',
            data: {
                orderId: orderId,
                ghnOrderCode: order.ghn_order_code,
                token: printResult.data.token,
                printUrls: printResult.data.printUrls,
                expiresIn: printResult.data.expiresIn,
                note: 'Token có hiệu lực 30 phút. Chọn định dạng in phù hợp.'
            }
        });

    } catch (error) {
        console.error('❌ Get print order URL error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy link in: ' + error.message
        });
    }
};

