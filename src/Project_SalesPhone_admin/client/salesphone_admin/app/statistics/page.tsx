"use client"

import styles from './statistics.module.scss';
import { useState, useEffect } from 'react';
import fetchDashboardStats from './api/get_stats.js';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaMoneyBillWave, FaShoppingCart, FaBox, FaUsers } from "react-icons/fa";

interface DashboardData {
    summary: {
        totalRevenue: number;
        totalOrders: number;
        totalProducts: number;
        totalUsers: number;
    };
    revenueByMonth: Array<{ month: string; revenue: number; order_count: number }>;
    ordersByStatus: Array<{ status: string; count: number }>;
    topProducts: Array<{ name_product: string; brand: string; sold_quantity: number; revenue: number }>;
    salesByBrand: Array<{ brand: string; order_count: number; sold_quantity: number; revenue: number }>;
    recentOrders: Array<{ id: string; username: string; total_amount: number; status: string; created_at: string }>;
}

export default function Statistics() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        try {
            setLoading(true);
            const result = await fetchDashboardStats();
            if (result.success) {
                setData(result.data);
            }
        } catch (err) {
            console.error('Error fetching stats:', err);
            setError('Không thể tải dữ liệu thống kê');
        } finally {
            setLoading(false);
        }
    }

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    function formatDate(dateString: string): string {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN');
    }

    function getStatusText(status: string): string {
        const statusMap: { [key: string]: string } = {
            'pending': 'Chờ xử lý',
            'processing': 'Đang xử lý',
            'shipping': 'Đang giao',
            'completed': 'Hoàn thành',
            'cancelled': 'Đã hủy'
        };
        return statusMap[status] || status;
    }

    const COLORS = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];

    if (loading) {
        return (
            <div className={styles.container_statistics}>
                <div className={styles.loading}>Đang tải dữ liệu...</div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className={styles.container_statistics}>
                <div className={styles.error}>{error || 'Có lỗi xảy ra'}</div>
            </div>
        );
    }

    return (
        <div className={styles.container_statistics}>
            <h1>📊 Thống kê & Báo cáo</h1>

            {/* Summary Cards */}
            <div className={styles.summary_cards}>
                <div className={styles.card}>
                    <div className={styles.card_header}>
                        <div className={`${styles.icon} ${styles.revenue}`}>
                            <FaMoneyBillWave />
                        </div>
                        <span className={styles.card_title}>Tổng doanh thu</span>
                    </div>
                    <div className={styles.card_value}>
                        {formatCurrency(data.summary.totalRevenue)}
                    </div>
                    <div className={styles.card_subtitle}>Từ đơn hàng hoàn thành</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card_header}>
                        <div className={`${styles.icon} ${styles.orders}`}>
                            <FaShoppingCart />
                        </div>
                        <span className={styles.card_title}>Tổng đơn hàng</span>
                    </div>
                    <div className={styles.card_value}>
                        {data.summary.totalOrders}
                    </div>
                    <div className={styles.card_subtitle}>Tất cả trạng thái</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card_header}>
                        <div className={`${styles.icon} ${styles.products}`}>
                            <FaBox />
                        </div>
                        <span className={styles.card_title}>Tổng sản phẩm</span>
                    </div>
                    <div className={styles.card_value}>
                        {data.summary.totalProducts}
                    </div>
                    <div className={styles.card_subtitle}>Đang kinh doanh</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card_header}>
                        <div className={`${styles.icon} ${styles.users}`}>
                            <FaUsers />
                        </div>
                        <span className={styles.card_title}>Tổng khách hàng</span>
                    </div>
                    <div className={styles.card_value}>
                        {data.summary.totalUsers}
                    </div>
                    <div className={styles.card_subtitle}>Tài khoản người dùng</div>
                </div>
            </div>

            {/* Charts Section */}
            <div className={styles.charts_section}>
                <div className={styles.chart_card}>
                    <h2>📈 Doanh thu 6 tháng gần đây</h2>
                    <div className={styles.chart_wrapper}>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data.revenueByMonth}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#667eea" strokeWidth={2} name="Doanh thu" />
                                <Line type="monotone" dataKey="order_count" stroke="#f093fb" strokeWidth={2} name="Số đơn" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={styles.chart_card}>
                    <h2>🎯 Trạng thái đơn hàng</h2>
                    <div className={styles.chart_wrapper}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data.ordersByStatus}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${getStatusText(entry.status)}: ${entry.count}`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {data.ordersByStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={styles.chart_card}>
                    <h2>🏆 Doanh thu theo thương hiệu</h2>
                    <div className={styles.chart_wrapper}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.salesByBrand}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="brand" />
                                <YAxis />
                                <Tooltip formatter={(value: number, name: string) => {
                                    if (name === 'revenue') return formatCurrency(value);
                                    return value;
                                }} />
                                <Legend />
                                <Bar dataKey="revenue" fill="#4facfe" name="Doanh thu" />
                                <Bar dataKey="sold_quantity" fill="#43e97b" name="Số lượng bán" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Tables Section */}
            <div className={styles.tables_section}>
                <div className={styles.table_card}>
                    <h2>🔥 Top 5 sản phẩm bán chạy</h2>
                    <div className={styles.table_container}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Thương hiệu</th>
                                    <th>Đã bán</th>
                                    <th>Doanh thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.topProducts.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.name_product}</td>
                                        <td>{product.brand}</td>
                                        <td className={styles.highlight}>{product.sold_quantity}</td>
                                        <td className={styles.highlight}>{formatCurrency(product.revenue)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.table_card}>
                    <h2>🕒 Đơn hàng gần đây</h2>
                    <div className={styles.table_container}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã đơn</th>
                                    <th>Khách hàng</th>
                                    <th>Giá trị</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.username}</td>
                                        <td className={styles.highlight}>{formatCurrency(order.total_amount)}</td>
                                        <td>
                                            <span className={`${styles.status_badge} ${styles[order.status]}`}>
                                                {getStatusText(order.status)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
