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

                    <div className={`${styles.item} ${styles.item1}`}>
                        
                        <div className={styles.thongtindiachi}>

                            <div className={styles.title_location}><IoLocation style={{color:'red', fontWeight: 'bold'}}/><span>Địa chỉ giao hàng</span></div>
                            <div className={styles.diachigiaohang}> {/*Địa chỉ giao hàng */}
                                <div>
                                    <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>Tỉnh/Thành phố *</span>
                                    <div className={styles.tinh}>
                                        <select>

                                            <option>Chọn tỉnh/thành</option>
                                            <option>TP.Hồ Chính Minh</option>
                                            <option>Hà Nội</option>
                                            <option>Hải Phòng</option>
                                            <option>Đà Nẵng</option>
                                            <option>Cần Thơ</option>

                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>Quận/Huyện *</span>
                                    <div className={styles.quan}>
                                        <select>

                                            <option>Chọn tỉnh/thành</option>
                                            <option>TP.Hồ Chính Minh</option>
                                            <option>Hà Nội</option>
                                            <option>Hải Phòng</option>
                                            <option>Đà Nẵng</option>
                                            <option>Cần Thơ</option>

                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>Phường/Xã *</span>
                                    <div className={styles.phuong}>
                                        <select>

                                            <option>Chọn tỉnh/thành</option>
                                            <option>TP.Hồ Chính Minh</option>
                                            <option>Hà Nội</option>
                                            <option>Hải Phòng</option>
                                            <option>Đà Nẵng</option>
                                            <option>Cần Thơ</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>Địa chỉ cụ thể</span>
                            <input className={styles.diachicuthe} placeholder='Nhập địa chỉ cụ thể...' type='text'/>
                        
                        </div>


                        {/*Phương thức thanh toán */}
                        <div className={styles.thongtindiachi}>
                                <div className={styles.title_location}><SiCashapp style={{color:'deepskyblue', fontWeight: 'bold'}}/><span>Phương thức thanh toán</span></div>
                            <div className={styles.luachonthanhtoan}>

                                <div className={styles.typecash}>
                                    <input type="radio" name="cash"/><span>Thanh toán khi nhận hàng (OCD)</span>
                                </div>

                                <div className={styles.typecash}>
                                    <input type="radio" name="cash" /><span>Chuyển khoản ngân hàng</span>
                                </div>
                            </div>
                            
                        </div>

                        {/*Ghi chú */}
                        <div className={styles.thongtindiachi}>
                            <div className={styles.title_location}><MdEventNote style={{color:'gold', fontWeight: 'bold'}}/><span>Ghi chú đơn hàng</span></div>
                            <input style={{width: '100%', border: 'none'}} type="text" placeholder='Ghi chú thêm (tùy chọn)' />
                        </div>


                    </div>

                    <div className={styles.item}>
                        <div className={styles.donhang}>
                            
                            <div className={styles.title_location}><FaShoppingBag style={{color:'green', fontWeight: 'bold'}}/><span>Tóm tắt đơn hàng</span></div>
                            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12pt', marginTop: '1rem', marginBottom: '0.5rem'}}>
                                <span style={{color: 'rgb(94, 94, 94)'}}>Giá tiền (2 sản phẩm):</span><span>56.980.000đ</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12pt'}}>
                                <span style={{color: 'rgb(94, 94, 94)'}}>Phí vận chuyển:</span><span style={{color: 'green'}}>Miễn phí</span>
                            </div>
                            <hr/>
                            <div className={styles.tien}>
                                <span>Tổng cộng</span>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                                    <span style={{fontSize: '20pt', color:'#A70000'}}>56.980.000đ</span>
                                    <span style={{display: 'flex', justifyContent: 'space-between', fontSize: '10pt',color: 'rgb(94, 94, 94)'}}>(Đã bao gồm VAT)</span>
                                </div>
                            </div>

                            <button>Thanh toán ngay</button>
                            <hr/>

                            <div className={styles.baohanh}>
                                <div className={styles.baohanh_icon}>
                                    <FaCheck />
                                </div>
                                <div className={styles.baohanh_content}>
                                    <span>Bảo hành chính hãng</span>
                                    <span style={{fontSize: '10pt', color: 'rgb(94, 94, 94)'}}>12 tháng toàn quốc</span>
                                </div>
                            </div>
                            <div className={styles.ttat}>
                                <div className={styles.ttat_icon}>
                                    <AiOutlineFileProtect />
                                </div>
                                <div className={styles.baohanh_content}>
                                    <span>Thanh toán an toàn</span>
                                    <span style={{fontSize: '10pt', color: 'rgb(94, 94, 94)'}}>Bảo mật thông tin 100%</span>
                                </div>
                            </div>
                            <div className={styles.doitra}>
                                <div className={styles.doitra_icon}>
                                    <MdLoop  />
                                </div>
                                <div className={styles.baohanh_content}>
                                    <span>Đổi trả dễ dàng</span>
                                    <span style={{fontSize: '10pt', color: 'rgb(94, 94, 94)'}}>Trong vòng 7 ngày</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </section>
    )
}