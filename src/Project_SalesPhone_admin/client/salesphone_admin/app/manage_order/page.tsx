"use client"

import styles from './manage_order.module.scss';
import { useState, useEffect } from 'react';
import fetchGetOrders from './api/get_orders.js';
import fetchOrderDetail from './api/get_order_detail.js';
import fetchUpdateOrderStatus from './api/update_order_status.js';
import fetchUpdatePaymentStatus from './api/update_payment_status.js';
import { FaEye, FaEdit } from "react-icons/fa";

interface Order {
    id: string;
    id_user: number;
    username: string;
    email: string;
    total_amount: number;
    status: string;
    payment_status: string;
    receiver_name: string;
    shipping_phone: string;
    shipping_address: string;
    note: string;
    created_at: string;
    updated_at: string;
}

interface OrderItem {
    id: number;
    id_product: number;
    name_product: string;
    brand: string;
    quantity: number;
    price: number;
    subtotal: number;
}

interface OrderDetail {
    order: Order;
    items: OrderItem[];
}

export default function ManageOrder() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPayment, setFilterPayment] = useState('all');

    // Update states
    const [updateOrderId, setUpdateOrderId] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');
    const [updatePaymentStatus, setUpdatePaymentStatus] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        try {
            const result = await fetchGetOrders();
            if (result.success) {
                setOrders(result.data);
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            showNotification('Lỗi khi tải danh sách đơn hàng', 'error');
        }
    }

    function showNotification(message: string, type: 'success' | 'error') {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: 'success' });
        }, 3000);
    }

    async function viewOrderDetail(orderId: string) {
        try {
            const result = await fetchOrderDetail(orderId);
            if (result.success) {
                setSelectedOrder(result.data);
                setShowDetailModal(true);
            }
        } catch (err) {
            console.error('Error fetching order detail:', err);
            showNotification('Lỗi khi tải chi tiết đơn hàng', 'error');
        }
    }

    function openUpdateModal(order: Order) {
        setUpdateOrderId(order.id);
        setUpdateStatus(order.status);
        setUpdatePaymentStatus(order.payment_status);
        setShowUpdateModal(true);
    }

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        
        try {
            const statusResult = await fetchUpdateOrderStatus(updateOrderId, updateStatus);
            const paymentResult = await fetchUpdatePaymentStatus(updateOrderId, updatePaymentStatus);
            
            if (statusResult.success && paymentResult.success) {
                showNotification('Cập nhật đơn hàng thành công', 'success');
                fetchOrders();
                setShowUpdateModal(false);
            }
        } catch (err) {
            console.error('Error updating order:', err);
            showNotification('Có lỗi xảy ra', 'error');
        }
    }

    function formatDate(dateString: string): string {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN');
    }

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
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

    function getPaymentStatusText(status: string): string {
        const statusMap: { [key: string]: string } = {
            'pending': 'Chưa thanh toán',
            'paid': 'Đã thanh toán',
            'refunded': 'Đã hoàn tiền'
        };
        return statusMap[status] || status;
    }

    const filteredOrders = orders.filter(order => {
        const statusMatch = filterStatus === 'all' || order.status === filterStatus;
        const paymentMatch = filterPayment === 'all' || order.payment_status === filterPayment;
        return statusMatch && paymentMatch;
    });

    return (
        <div className={styles.container_manage_order}>
            <div className={styles.container}>
            <h1>Quản lý Đơn hàng</h1>

            <div className={styles.filter_section}>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">Tất cả trạng thái</option>
                    <option value="pending">Chờ xử lý</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="shipping">Đang giao</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                </select>

                <select value={filterPayment} onChange={(e) => setFilterPayment(e.target.value)}>
                    <option value="all">Tất cả thanh toán</option>
                    <option value="pending">Chưa thanh toán</option>
                    <option value="paid">Đã thanh toán</option>
                    <option value="refunded">Đã hoàn tiền</option>
                </select>
            </div>

            <div className={styles.table_container}>
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Customer</th>
                            <th>Name Customer</th>
                            <th>Phone</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Order at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>
                                    <div>{order.username}</div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>{order.email}</div>
                                </td>
                                <td>{order.receiver_name}</td>
                                <td>{order.shipping_phone}</td>
                                <td style={{ fontWeight: 'bold', color: '#4CAF50' }}>
                                    {formatCurrency(order.total_amount)}
                                </td>
                                <td>
                                    <span className={`${styles.status_badge} ${styles[order.status]}`}>
                                        {getStatusText(order.status)}
                                    </span>
                                </td>
                                <td>
                                    <span className={`${styles.status_badge} ${styles[order.payment_status]}`}>
                                        {getPaymentStatusText(order.payment_status)}
                                    </span>
                                </td>
                                <td>{formatDate(order.created_at)}</td>
                                <td>
                                    <div className={styles.action_buttons}>
                                        <button 
                                            className={styles.btn_view}
                                            onClick={() => viewOrderDetail(order.id)}
                                        >
                                            <FaEye /> Chi tiết
                                        </button>
                                        <button 
                                            className={styles.btn_update}
                                            onClick={() => openUpdateModal(order)}
                                        >
                                            <FaEdit /> Cập nhật
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            </div>

            {/* Modal Chi tiết đơn hàng */}
            {showDetailModal && selectedOrder && (
                <div className={styles.modal_overlay} onClick={() => setShowDetailModal(false)}>
                    <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
                        <h2>Chi tiết đơn hàng #{selectedOrder.order.id}</h2>
                        
                        <div className={styles.order_info}>
                            <div className={styles.info_row}>
                                <span className={styles.label}>Khách hàng:</span>
                                <span className={styles.value}>{selectedOrder.order.username} ({selectedOrder.order.email})</span>
                            </div>
                            <div className={styles.info_row}>
                                <span className={styles.label}>Người nhận:</span>
                                <span className={styles.value}>{selectedOrder.order.receiver_name}</span>
                            </div>
                            <div className={styles.info_row}>
                                <span className={styles.label}>Số điện thoại:</span>
                                <span className={styles.value}>{selectedOrder.order.shipping_phone}</span>
                            </div>
                            <div className={styles.info_row}>
                                <span className={styles.label}>Địa chỉ giao hàng:</span>
                                <span className={styles.value}>{selectedOrder.order.shipping_address}</span>
                            </div>
                            <div className={styles.info_row}>
                                <span className={styles.label}>Trạng thái:</span>
                                <span className={styles.value}>
                                    <span className={`${styles.status_badge} ${styles[selectedOrder.order.status]}`}>
                                        {getStatusText(selectedOrder.order.status)}
                                    </span>
                                </span>
                            </div>
                            <div className={styles.info_row}>
                                <span className={styles.label}>Thanh toán:</span>
                                <span className={styles.value}>
                                    <span className={`${styles.status_badge} ${styles[selectedOrder.order.payment_status]}`}>
                                        {getPaymentStatusText(selectedOrder.order.payment_status)}
                                    </span>
                                </span>
                            </div>
                            {selectedOrder.order.note && (
                                <div className={styles.info_row}>
                                    <span className={styles.label}>Ghi chú:</span>
                                    <span className={styles.value}>{selectedOrder.order.note}</span>
                                </div>
                            )}
                            <div className={styles.info_row}>
                                <span className={styles.label}>Ngày đặt:</span>
                                <span className={styles.value}>{formatDate(selectedOrder.order.created_at)}</span>
                            </div>
                        </div>

                        <div className={styles.order_items}>
                            <h3>Sản phẩm đã đặt</h3>
                            {selectedOrder.items.map((item) => (
                                <div key={item.id} className={styles.item}>
                                    <div className={styles.item_info}>
                                        <div className={styles.item_name}>
                                            {item.name_product} ({item.brand})
                                        </div>
                                        <div className={styles.item_detail}>
                                            Số lượng: {item.quantity} x {formatCurrency(item.price)}
                                        </div>
                                    </div>
                                    <div className={styles.item_price}>
                                        {formatCurrency(item.subtotal)}
                                    </div>
                                </div>
                            ))}
                            
                            <div className={styles.total}>
                                <span className={styles.total_label}>Tổng cộng:</span>
                                <span className={styles.total_amount}>
                                    {formatCurrency(selectedOrder.order.total_amount)}
                                </span>
                            </div>
                        </div>

                        <div className={styles.modal_buttons}>
                            <button className={styles.btn_cancel} onClick={() => setShowDetailModal(false)}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Cập nhật trạng thái */}
            {showUpdateModal && (
                <div className={styles.modal_overlay} onClick={() => setShowUpdateModal(false)}>
                    <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
                        <h2>Cập nhật đơn hàng #{updateOrderId}</h2>
                        <form onSubmit={handleUpdate}>
                            <div className={styles.form_group}>
                                <label>Trạng thái đơn hàng *</label>
                                <select
                                    value={updateStatus}
                                    onChange={(e) => setUpdateStatus(e.target.value)}
                                    required
                                >
                                    <option value="pending">Chờ xử lý</option>
                                    <option value="processing">Đang xử lý</option>
                                    <option value="shipping">Đang giao</option>
                                    <option value="completed">Hoàn thành</option>
                                    <option value="cancelled">Đã hủy</option>
                                </select>
                            </div>

                            <div className={styles.form_group}>
                                <label>Trạng thái thanh toán *</label>
                                <select
                                    value={updatePaymentStatus}
                                    onChange={(e) => setUpdatePaymentStatus(e.target.value)}
                                    required
                                >
                                    <option value="pending">Chưa thanh toán</option>
                                    <option value="paid">Đã thanh toán</option>
                                    <option value="refunded">Đã hoàn tiền</option>
                                </select>
                            </div>

                            <div className={styles.modal_buttons}>
                                <button type="button" className={styles.btn_cancel} onClick={() => setShowUpdateModal(false)}>
                                    Hủy
                                </button>
                                <button type="submit" className={styles.btn_submit}>
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {notification.show && (
                <div className={`${styles.notification} ${notification.type === 'error' ? styles.error : ''}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
}
