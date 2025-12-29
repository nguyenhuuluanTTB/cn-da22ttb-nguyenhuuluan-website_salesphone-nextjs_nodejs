"use client"

import styles from "./cart.module.scss";
import qrStyles from "./qr-popup.module.scss";
import { FaOpencart, FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { getProduct } from './api/getProductInCart';
import { updateCartQuantity } from './api/updateCartQuantity';
import { IoLocation } from "react-icons/io5";
import { SiCashapp } from "react-icons/si";
import { MdEventNote} from "react-icons/md";

interface Phone {
    id_cart: number;
    id_product: number;
    quantity: number;
    name_product: string;
    price: number;
    rom: string;
    color: string;
    percent: number;
    img: string;
    quantity_stock?: number; // Số lượng tồn kho
}

export default function Cart() {
    const [phones, setPhones] = useState<Phone[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod'); // cod hoặc bank_transfer
    const [showQRPopup, setShowQRPopup] = useState(false);
    const [orderData, setOrderData] = useState({
        orderId: '',
        amount: 0
    });
    const [checkingPayment, setCheckingPayment] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Tự động kiểm tra thanh toán mỗi 5 giây khi popup mở
    useEffect(() => {
        if (!showQRPopup || !orderData.orderId) return;

        const intervalId = setInterval(async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Checking payment for order:', orderData.orderId);
                
                const response = await fetch(`http://localhost:5000/api/payment/verify/${orderData.orderId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    console.error('Payment check failed:', response.status);
                    return;
                }

                const data = await response.json();
                console.log('Payment check result:', data);
                
                if (data.success && data.paid) {
                    console.log('Payment successful! Showing success popup...');
                    clearInterval(intervalId);
                    setShowQRPopup(false);
                    setShowSuccessPopup(true);
                    
                    // Tự động chuyển trang sau 3 giây
                    setTimeout(() => {
                        window.location.href = '/order';
                    }, 3000);
                }
            } catch (err) {
                console.error('Check payment error:', err);
            }
        }, 5000); // Check mỗi 5 giây

        return () => clearInterval(intervalId);
    }, [showQRPopup, orderData.orderId]);

    useEffect(() => {
        const fetchProductInCart = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const result = await getProduct(token);
                if (!result) throw new Error("HTTP error!");

                // Check if result.data exists and is an array
                if (!result.data || !Array.isArray(result.data)) {
                    console.error('Invalid response format:', result);
                    setPhones([]);
                    return;
                }

                const normalized: Phone[] = result.data.map((p: any) => ({
                    id_cart: Number(p.id_cart),
                    id_product: Number(p.id_product),
                    quantity: p.quantity,
                    name_product: p.name_product,
                    price: Number(p.price),
                    rom: p.rom,
                    color: p.color,
                    percent: Number(p.percent),
                    img: p.image_url
                }));
                setPhones(normalized);
            } catch (err) {
                console.error(err);
                setPhones([]);
            }
        }
        fetchProductInCart();
    }, []);

    // Handle chọn từng sản phẩm
    const handleCheck = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedIds([...selectedIds, id]);
        } else {
            setSelectedIds(selectedIds.filter(pid => pid !== id));
            setSelectAll(false);
        }
    }

    // Handle chọn tất cả
    const handleSelectAll = (checked: boolean) => {
        setSelectAll(checked);
        if (checked) {
            setSelectedIds(phones.map(phone => phone.id_product));
        } else {
            setSelectedIds([]);
        }
    }

    // Handle thay đổi số lượng
    const handleQuantityChange = async (id_product: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const result = await updateCartQuantity(token, id_product, newQuantity);
            
            // Cập nhật state local
            setPhones(phones.map(phone => 
                phone.id_product === id_product 
                    ? { ...phone, quantity: newQuantity }
                    : phone
            ));
        } catch (err: any) {
            alert(err.message || 'Không thể cập nhật số lượng');
        }
    }

    // Tổng tiền dựa trên các sản phẩm được chọn
    const tongtien = phones
        .filter(phone => selectedIds.includes(phone.id_product))
        .reduce((total, phone) => {
            const discountedPrice = phone.percent > 0
                ? Math.round(phone.price * (1 - phone.percent / 100))
                : phone.price;
            return total + discountedPrice * phone.quantity;
        }, 0);

    // Số lượng sản phẩm được chọn
    const sosp = phones
        .filter(phone => selectedIds.includes(phone.id_product))
        .reduce((sl, phone) => sl + phone.quantity, 0);

    // Hàm xử lý đặt hàng
    const handleCheckout = async () => {
        if (paymentMethod === 'bank_transfer') {
            // Tạo mã đơn hàng
            const newOrderId = 'DH' + Date.now();
            
            // Lưu thông tin đơn hàng vào database trước
            try {
                const token = localStorage.getItem('token');
                console.log('Creating payment for order:', newOrderId);
                
                const response = await fetch('http://localhost:5000/api/payment/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        orderId: newOrderId,
                        amount: tongtien,
                        description: 'Thanh toán đơn hàng'
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Payment created:', result);
                } else {
                    console.error('Failed to create payment:', response.status);
                }
            } catch (err) {
                console.error('Create payment error:', err);
            }

            setOrderData({
                orderId: newOrderId,
                amount: tongtien
            });
            setShowQRPopup(true);
        } else {
            // Thanh toán COD - chuyển đến trang đơn hàng
            window.location.href = '/order';
        }
    };

    return (
        <section className={styles.cart}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <div className={styles.icon_cart}><FaOpencart /></div>
                    <span>GIỎ HÀNG CỦA BẠN</span>
                </div>

                <div className={styles.gridContainer}>
                    <div className={styles.item}>
                        <div className={styles.selection_toolbar}>
                            <div className={styles.select_all}>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={e => handleSelectAll(e.target.checked)}
                                />
                                <span>Chọn tất cả</span>
                            </div>

                            <div className={styles.delete_all}>
                                <FaRegTrashAlt /><span>Xóa tất cả</span>
                            </div>
                        </div>

                        <div className={styles.container_product}>
                            {phones.map(phone => {
                                const discountedPrice = phone.percent > 0
                                    ? Math.round(phone.price * (1 - phone.percent / 100))
                                    : phone.price;
                                const thanhtien = discountedPrice * phone.quantity;

                                return (
                                    <div key={phone.id_product} className={styles.product}>
                                        <div className={styles.left}>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(phone.id_product)}
                                                onChange={e => handleCheck(phone.id_product, e.target.checked)}
                                            />

                                            <Image src={phone.img} width={170} height={170} alt="ảnh sản phẩm" />

                                            <div className={styles.inf}>
                                                <span style={{ fontSize: '13pt' }}>{phone.name_product}</span>
                                                <span style={{ fontSize: '12pt', color: 'rgb(94, 94, 94)' }}>
                                                    {phone.rom} - {phone.color}
                                                </span>
                                                <span style={{ color: '#A70000' }}>{discountedPrice.toLocaleString("vi-VN")}đ</span>
                                                <span style={{ color: 'rgb(94, 94, 94)', fontSize: '12pt', textDecoration: 'line-through' }}>
                                                    {phone.price.toLocaleString("vi-VN")}đ
                                                </span>
                                                <div className={styles.quantity}>
                                                    <span style={{ fontSize: '10pt' }}>Số lượng sản phẩm: {phone.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.right}>
                                            <div className={styles.icon_trash}><FaRegTrashAlt /></div>
                                            <div className={styles.price}>
                                                <span style={{ fontSize: '10pt', color: 'rgb(94, 94, 94)' }}>Thành tiền</span>
                                                <span style={{ color: '#A70000' }}>{thanhtien.toLocaleString("vi-VN")}đ</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <br/>
                        <div className={styles.thongtindathang}>
                                <h3 style={{textAlign: 'center'}}>Vui lòng cung cấp thông tin để thực hiện đặt hàng</h3>
                        </div>

                        {/*Thông tin địa chỉ */}
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
                        <br/>

                        {/*Phương thức thanh toán */}
                        <div className={styles.thongtindiachi}>
                                <div className={styles.title_location}><SiCashapp style={{color:'deepskyblue', fontWeight: 'bold'}}/><span>Phương thức thanh toán</span></div>
                            <div className={styles.luachonthanhtoan}>

                                <div className={styles.typecash}>
                                    <input 
                                        type="radio" 
                                        name="cash" 
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span>Thanh toán khi nhận hàng (COD)</span>
                                </div>

                                <div className={styles.typecash}>
                                    <input 
                                        type="radio" 
                                        name="cash" 
                                        value="bank_transfer"
                                        checked={paymentMethod === 'bank_transfer'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span>Chuyển khoản ngân hàng</span>
                                </div>
                            </div>
                            
                        </div>
                        
                        <br/>
                        {/*Ghi chú */}
                        <div className={styles.thongtindiachi}>
                            <div className={styles.title_location}><MdEventNote style={{color:'gold', fontWeight: 'bold'}}/><span>Ghi chú đơn hàng</span></div>
                            <input style={{width: '100%', border: 'none'}} type="text" placeholder='Ghi chú thêm (tùy chọn)' />
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.tongcong}>
                            <h4>Tổng đơn hàng</h4>

                            <div className={styles.giasp}>
                                <span style={{ color: 'rgb(94, 94, 94)' }}>Tạm tính ({sosp} sản phẩm)</span>
                                <span>{tongtien.toLocaleString("vi-VN")}đ</span>
                            </div>

                            <hr />

                            <div className={styles.tong_gia}>
                                <span>Tổng cộng</span>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                                    <span style={{ fontSize: '22pt', color: '#A70000' }}>{tongtien.toLocaleString("vi-VN")}đ</span>
                                    <span style={{ fontSize: '12pt', color: 'rgb(94, 94, 94)' }}>(đã bao gồm VAT)</span>
                                </div>
                            </div>

                            <button onClick={(e) => {
                                e.preventDefault();
                                handleCheckout();
                            }} style={{ 
                                textDecoration: 'none', 
                                color: '#fff', 
                                border: 'none', 
                                background: '#A70000', 
                                padding: '1rem 2rem', 
                                borderRadius: '10px', 
                                cursor: 'pointer', 
                                fontSize: '1rem', 
                                fontWeight: 'bold',
                                width: '100%'
                            }}>
                                Tiến hành đặt hàng
                            </button>

                            <hr />

                            <ul>
                                <li><span>Bảo hành chính hãng 12 tháng</span></li>
                                <li><span>Đổi trả trong 7 ngày</span></li>
                                <li><span>Thanh toán an toàn & bảo mật</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup QR Code thanh toán */}
            {showQRPopup && (
                <div className={qrStyles.qrPopupOverlay} onClick={() => setShowQRPopup(false)}>
                    <div className={qrStyles.qrPopupContent} onClick={(e) => e.stopPropagation()}>
                        <button className={qrStyles.closeBtn} onClick={() => setShowQRPopup(false)}>×</button>
                        
                        <h2>Quét mã QR để thanh toán</h2>
                        <p className={qrStyles.orderInfo}>
                            Mã đơn hàng: <strong>{orderData.orderId}</strong> | 
                            Số tiền: <strong style={{color: '#A70000'}}>{orderData.amount.toLocaleString('vi-VN')}đ</strong>
                        </p>
                        <p className={qrStyles.autoCheck}>
                            🔄 Hệ thống tự động kiểm tra thanh toán mỗi 5 giây
                        </p>
                        
                        <div className={qrStyles.popupGrid}>
                            {/* Bên trái: QR Code */}
                            <div className={qrStyles.qrCodeContainer}>
                                <img 
                                    src={`https://qr.sepay.vn/img?acc=0374057078&bank=VPBank&amount=2000&des=TKPNHL ${orderData.orderId}`}
                                    alt="QR Code thanh toán"
                                    className={qrStyles.qrCodeImage}
                                />
                            </div>

                            {/* Bên phải: Thông tin */}
                            <div className={qrStyles.rightContent}>
                                <div className={qrStyles.bankInfo}>
                                    <h3>Thông tin chuyển khoản</h3>
                                    <p><strong>Ngân hàng:</strong> VPBank</p>
                                    <p><strong>Số tài khoản:</strong> 0374057078</p>
                                    <p><strong>Chủ tài khoản:</strong> NGUYEN HUU LUAN</p>
                                    <p><strong>Nội dung:</strong> TKPNHL {orderData.orderId}</p>
                                </div>

                                <div className={qrStyles.instructions}>
                                    <h4>Hướng dẫn thanh toán:</h4>
                                    <ol>
                                        <li>Mở ứng dụng ngân hàng trên điện thoại</li>
                                        <li>Quét mã QR code bên trái</li>
                                        <li>Kiểm tra thông tin và xác nhận thanh toán</li>
                                        <li>Đơn hàng sẽ được xử lý sau khi nhận được tiền</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Popup thanh toán thành công */}
            {showSuccessPopup && (
                <div className={qrStyles.qrPopupOverlay}>
                    <div className={qrStyles.successPopup}>
                        <div className={qrStyles.successIcon}>✓</div>
                        <h2>Thanh toán thành công!</h2>
                        <p>Đơn hàng <strong>{orderData.orderId}</strong> đã được thanh toán</p>
                        <p className={qrStyles.redirectMsg}>Đang chuyển đến trang đơn hàng...</p>
                    </div>
                </div>
            )}
        </section>
    );
}
