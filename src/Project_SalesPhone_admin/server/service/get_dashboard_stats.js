import { sequelize } from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function get_dashboard_stats() {
    try {
        // Tổng doanh thu
        const [[totalRevenue]] = await sequelize.query(
            `SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status = 'completed'`
        );

        // Tổng đơn hàng
        const [[totalOrders]] = await sequelize.query(
            `SELECT COUNT(*) as total FROM orders`
        );

        // Tổng sản phẩm
        const [[totalProducts]] = await sequelize.query(
            `SELECT COUNT(*) as total FROM product WHERE is_del_phone = 0`
        );

        // Tổng khách hàng
        const [[totalUsers]] = await sequelize.query(
            `SELECT COUNT(*) as total FROM user_account WHERE role = 'user'`
        );

        // Doanh thu theo tháng (6 tháng gần nhất)
        const [revenueByMonth] = await sequelize.query(
            `
            SELECT 
                DATE_FORMAT(created_at, '%Y-%m') as month,
                SUM(total_amount) as revenue,
                COUNT(*) as order_count
            FROM orders 
            WHERE status = 'completed' 
            AND created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
            GROUP BY DATE_FORMAT(created_at, '%Y-%m')
            ORDER BY month ASC
            `
        );

        // Trạng thái đơn hàng
        const [ordersByStatus] = await sequelize.query(
            `
            SELECT 
                status,
                COUNT(*) as count
            FROM orders
            GROUP BY status
            `
        );

        // Top 5 sản phẩm bán chạy
        const [topProducts] = await sequelize.query(
            `
            SELECT 
                p.name_product,
                p.brand,
                SUM(oi.quantity) as sold_quantity,
                SUM(oi.quantity * oi.price) as revenue
            FROM order_items oi
            JOIN product p ON oi.id_product = p.id_product
            JOIN orders o ON oi.order_id = o.id
            WHERE o.status = 'completed'
            GROUP BY oi.id_product, p.name_product, p.brand
            ORDER BY sold_quantity DESC
            LIMIT 5
            `
        );

        // Thống kê theo thương hiệu
        const [salesByBrand] = await sequelize.query(
            `
            SELECT 
                p.brand,
                COUNT(DISTINCT oi.order_id) as order_count,
                SUM(oi.quantity) as sold_quantity,
                SUM(oi.quantity * oi.price) as revenue
            FROM order_items oi
            JOIN product p ON oi.id_product = p.id_product
            JOIN orders o ON oi.order_id = o.id
            WHERE o.status = 'completed'
            GROUP BY p.brand
            ORDER BY revenue DESC
            `
        );

        // Đơn hàng gần đây
        const [recentOrders] = await sequelize.query(
            `
            SELECT 
                o.id,
                u.name as username,
                o.total_amount,
                o.status,
                o.created_at
            FROM orders o
            LEFT JOIN user_account u ON o.id_user = u.id_user
            ORDER BY o.created_at DESC
            LIMIT 5
            `
        );

        return {
            success: true,
            data: {
                summary: {
                    totalRevenue: totalRevenue.total,
                    totalOrders: totalOrders.total,
                    totalProducts: totalProducts.total,
                    totalUsers: totalUsers.total
                },
                revenueByMonth,
                ordersByStatus,
                topProducts,
                salesByBrand,
                recentOrders
            }
        };
    } catch (err) {
        console.error('Error while getting dashboard stats:', err);
        throw err;
    }
}

export default get_dashboard_stats;
