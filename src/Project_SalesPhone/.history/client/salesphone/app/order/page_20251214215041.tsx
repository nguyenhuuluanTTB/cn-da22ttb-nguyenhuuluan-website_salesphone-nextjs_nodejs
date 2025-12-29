"use client"

import { useState, useEffect } from 'react';
import styles from './order.module.scss';
import { FaShoppingBag, FaTruck, FaCheckCircle } from "react-icons/fa";
import { MdPending, MdCancel } from "react-icons/md";
import { GiCash } from "react-icons/gi";

interface Order {
    id: string;
    total_amount: number;
    shipping_fee: number;
    status: string;
    payment_status: string;
    payment_method: string;
    receiver_name: string;
    shipping_phone: string;
    shipping_address: string;
    ghn_order_code: string;
    created_at: string;
    updated_at: string;
    items?: OrderItem[];
}

interface OrderItem {
    quantity: number;
    price: number;
    name_product: string;
    image: string;
}

export default function Order () {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError('Vui lòng đăng nhập');
                setLoading(false);
                return;
            }

            const response = await fetch('http://localhost:5000/api/order/list', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                setOrders(data.data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error('Fetch orders error:', err);
            setError('Không thể tải danh sách đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <FaCheckCircle style={{color: 'green'}} />;
            case 'shipping':
                return <FaTruck style={{color: 'blue'}} />;
            case 'cancelled':
                return <MdCancel style={{color: 'red'}} />;
            default:
                return <MdPending style={{color: 'orange'}} />;
        }
    };

    const getStatusText = (status: string) => {
        const statusMap: Record<string, string> = {
            'pending': 'Chờ xử lý',
            'confirmed': 'Đã xác nhận',
            'processing': 'Đang xử lý',
            'shipping': 'Đang giao hàng',
            'completed': 'Hoàn thành',
            'cancelled': 'Đã hủy',
            'failed': 'Thất bại'
        };
        return statusMap[status] || status;
    };

    const getPaymentStatusText = (status: string) => {
        const statusMap: Record<string, string> = {
            'pending': 'Chưa thanh toán',
            'paid': 'Đã thanh toán',
            'cancelled': 'Đã hủy',
            'refunded': 'Đã hoàn tiền'
        };
        return statusMap[status] || status;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    if (loading) {
        return (
            <section className={styles.order}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <div className={styles.icon_cart}>
                            <GiCash />
                        </div>  
                        <span>ĐƠN HÀNG CỦA BẠN</span>
                    </div>
                    <div style={{textAlign: 'center', padding: '2rem'}}>
                        <p>Đang tải danh sách đơn hàng...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles.order}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <div className={styles.icon_cart}>
                            <GiCash />
                        </div>  
                        <span>ĐƠN HÀNG CỦA BẠN</span>
                    </div>
                    <div style={{textAlign: 'center', padding: '2rem', color: 'red'}}>
                        <p>{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return(
        <section className={styles.order}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <div className={styles.icon_cart}>
                        <FaShoppingBag />
                    </div>  
                    <span>ĐƠN HÀNG CỦA BẠN ({orders.length})</span>
                </div>

                {orders.length === 0 ? (
                    <div style={{textAlign: 'center', padding: '3rem'}}>
                        <p style={{fontSize: '14pt', color: '#666'}}>Bạn chưa có đơn hàng nào</p>
                        <button 
                            style={{
                                marginTop: '1rem',
                                padding: '0.8rem 2rem',
                                backgroundColor: '#A70000',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                            onClick={() => window.location.href = '/home'}
                        >
                            Mua sắm ngay
                        </button>
                    </div>
                ) : (
                    <div style={{padding: '1rem'}}>
                        {orders.map((order) => (
                            <div 
                                key={order.id}
                                style={{
                                    backgroundColor: 'white',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '1.5rem',
                                    marginBottom: '1rem',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1rem',
                                    borderBottom: '1px solid #eee',
                                    paddingBottom: '1rem'
                                }}>
                                    <div>
                                        <h3 style={{margin: 0, fontSize: '14pt'}}>
                                            Đơn hàng: {order.id}
                                        </h3>
                                        <p style={{margin: '0.3rem 0', fontSize: '10pt', color: '#666'}}>
                                            {formatDate(order.created_at)}
                                        </p>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        {getStatusIcon(order.status)}
                                        <span style={{fontWeight: 'bold', fontSize: '12pt'}}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </div>
                                </div>

                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                                    <div>
                                        <p style={{margin: '0.3rem 0', fontSize: '11pt'}}>
                                            <strong>Người nhận:</strong> {order.receiver_name}
                                        </p>
                                        <p style={{margin: '0.3rem 0', fontSize: '11pt'}}>
                                            <strong>SĐT:</strong> {order.shipping_phone}
                                        </p>
                                        <p style={{margin: '0.3rem 0', fontSize: '11pt'}}>
                                            <strong>Phương thức:</strong> {order.payment_method === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}
                                        </p>
                                    </div>
                                    <div style={{textAlign: 'right'}}>
                                        <p style={{margin: '0.3rem 0', fontSize: '11pt'}}>
                                            <strong>Tổng tiền:</strong> <span style={{color: '#A70000', fontSize: '13pt', fontWeight: 'bold'}}>{formatPrice(order.total_amount)}</span>
                                        </p>
                                        <p style={{margin: '0.3rem 0', fontSize: '11pt'}}>
                                            <strong>Phí ship:</strong> {formatPrice(order.shipping_fee)}
                                        </p>
                                        <p style={{margin: '0.3rem 0', fontSize: '11pt'}}>
                                            <strong>Thanh toán:</strong> 
                                            <span style={{
                                                color: order.payment_status === 'paid' ? 'green' : 'orange',
                                                fontWeight: 'bold',
                                                marginLeft: '0.5rem'
                                            }}>
                                                {getPaymentStatusText(order.payment_status)}
                                            </span>
                                        </p>
                                        {order.ghn_order_code && (
                                            <p style={{margin: '0.3rem 0', fontSize: '10pt', color: '#666'}}>
                                                Mã GHN: {order.ghn_order_code}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div style={{marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}>
                                    <button
                                        style={{
                                            padding: '0.6rem 1.5rem',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontSize: '11pt'
                                        }}
                                        onClick={() => window.location.href = `/order/${order.id}`}
                                    >
                                        Xem chi tiết
                                    </button>
                                    {order.status === 'completed' && (
                                        <button
                                            style={{
                                                padding: '0.6rem 1.5rem',
                                                backgroundColor: '#28a745',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                fontSize: '11pt'
                                            }}
                                        >
                                            Mua lại
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}