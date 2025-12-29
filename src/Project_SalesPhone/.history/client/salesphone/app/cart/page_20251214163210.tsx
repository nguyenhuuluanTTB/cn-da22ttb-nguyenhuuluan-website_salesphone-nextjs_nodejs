"use client"

import styles from "./cart.module.scss";
import qrStyles from "./qr-popup.module.scss";
import { FaOpencart, FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { getProduct } from './api/getProductInCart';
import { updateCartQuantity } from './api/updateCartQuantity';
import { createOrder } from './api/createOrder';
import { getProvinces, getDistricts, getWards, calculateShippingFee } from './api/ghn';
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
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [orderData, setOrderData] = useState({
        orderId: '',
        amount: 0
    });
    const [checkingPayment, setCheckingPayment] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // State cho địa chỉ giao hàng
    const [provinces, setProvinces] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');
    const [shippingFee, setShippingFee] = useState(0);
    const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

    // State cho thông tin người nhận
    const [receiverName, setReceiverName] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');

    // Load thông tin user khi component mount
    useEffect(() => {
        const loadProvinces = async () => {
            try {
                const data = await getProvinces();
                setProvinces(data);
            } catch (error) {
                console.error('Error loading provinces:', error);
            }
        };
        loadProvinces();
    }, []);

    // Load quận/huyện khi chọn tỉnh
    useEffect(() => {
        if (selectedProvince) {
            const loadDistricts = async () => {
                try {
                    const data = await getDistricts(parseInt(selectedProvince));
                    setDistricts(data);
                    setWards([]);
                    setSelectedDistrict('');
                    setSelectedWard('');
                } catch (error) {
                    console.error('Error loading districts:', error);
                }
            };
            loadDistricts();
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [selectedProvince]);

    // Load phường/xã khi chọn quận
    useEffect(() => {
        if (selectedDistrict) {
            const loadWards = async () => {
                try {
                    const data = await getWards(parseInt(selectedDistrict));
                    setWards(data);
                    setSelectedWard('');
                } catch (error) {
                    console.error('Error loading wards:', error);
                }
            };
            loadWards();
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);

    // Tính phí vận chuyển khi có đủ thông tin
    useEffect(() => {
        if (selectedDistrict && selectedWard) {
            const calculateFee = async () => {
                setIsCalculatingShipping(true);
                try {
                    // Tính tổng khối lượng (giả định mỗi điện thoại nặng 500g)
                    const totalWeight = phones.reduce((total, phone) => {
                        if (selectedIds.includes(phone.id_product)) {
                            return total + (phone.quantity * 500);
                        }
                        return total;
                    }, 0);

                    const fee = await calculateShippingFee(
                        selectedDistrict,
                        selectedWard,
                        totalWeight || 1000
                    );
                    setShippingFee(fee);
                } catch (error) {
                    console.error('Error calculating shipping fee:', error);
                    setShippingFee(0);
                } finally {
                    setIsCalculatingShipping(false);
                }
            };
            calculateFee();
        } else {
            setShippingFee(0);
        }
    }, [selectedDistrict, selectedWard, phones, selectedIds]);

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
                    console.log('Payment successful! Creating order...');
                    clearInterval(intervalId);
                    
                    // Lấy thông tin đơn hàng đã lưu
                    const pendingOrderStr = localStorage.getItem('pendingOrder');
                    if (pendingOrderStr) {
                        try {
                            const pendingOrder = JSON.parse(pendingOrderStr);
                            const token = localStorage.getItem('token');
                            
                            // Tạo đơn hàng sau khi thanh toán thành công
                            await createOrder(token, pendingOrder);
                            
                            // Xóa pending order
                            localStorage.removeItem('pendingOrder');
                        } catch (createErr) {
                            console.error('Error creating order after payment:', createErr);
                        }
                    }
                    
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
            if (!token) {
                setErrorMessage('Vui lòng đăng nhập để tiếp tục');
                setTimeout(() => setErrorMessage(''), 3000);
                return;
            }

            const result = await updateCartQuantity(token, id_product, newQuantity);
            
            // Cập nhật state local
            setPhones(phones.map(phone => 
                phone.id_product === id_product 
                    ? { ...phone, quantity: newQuantity }
                    : phone
            ));
            
            // Xóa error message nếu thành công
            setErrorMessage('');
        } catch (err: any) {
            console.error('Update quantity error:', err);
            const message = err?.message || err || 'Không thể cập nhật số lượng';
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(''), 5000);
            
            // Reload lại data từ server để đồng bộ
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const result = await getProduct(token);
                    if (result?.data && Array.isArray(result.data)) {
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
                    }
                } catch (reloadErr) {
                    console.error('Failed to reload cart:', reloadErr);
                }
            }
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
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Vui lòng đăng nhập để tiếp tục');
                return;
            }

            // Kiểm tra thông tin người nhận
            if (!receiverName || !receiverPhone) {
                alert('Vui lòng điền đầy đủ thông tin người nhận');
                return;
            }

            // Kiểm tra địa chỉ
            if (!selectedProvince || !selectedDistrict || !selectedWard || !detailedAddress) {
                alert('Vui lòng điền đầy đủ thông tin địa chỉ giao hàng');
                return;
            }

            // Chuẩn bị dữ liệu đưn hàng
            const selectedProducts = phones
                .filter(phone => selectedIds.includes(phone.id_product))
                .map(phone => ({
                    id_product: phone.id_product,
                    quantity: phone.quantity,
                    price: phone.percent > 0
                        ? Math.round(phone.price * (1 - phone.percent / 100))
                        : phone.price
                }));

            if (selectedProducts.length === 0) {
                alert('Vui lòng chọn sản phẩm để đặt hàng');
                return;
            }

            // Lấy tên tỉnh/quận/phường
            const provinceName = provinces.find(p => p.ProvinceID == selectedProvince)?.ProvinceName || '';
            const districtName = districts.find(d => d.DistrictID == selectedDistrict)?.DistrictName || '';
            const wardName = wards.find(w => w.WardCode == selectedWard)?.WardName || '';

            const orderData = {
                products: selectedProducts,
                paymentMethod: paymentMethod,
                receiverInfo: {
                    name: receiverName,
                    phone: receiverPhone
                },
                shippingAddress: {
                    province: provinceName,
                    district: districtName,
                    ward: wardName,
                    detail: detailedAddress
                },
                shippingFee: shippingFee,
                totalAmount: tongtien + shippingFee
            };

            if (paymentMethod === 'bank_transfer') {
                // Chỉ tạo payment record, chưa tạo đưn hàng
                const newOrderId = 'DH' + Date.now();
                
                try {
                    const response = await fetch('http://localhost:5000/api/payment/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            orderId: newOrderId,
                            amount: tongtien + shippingFee,
                            description: 'Thanh toán đơn hàng'
                        })
                    });

                    if (response.ok) {
                        console.log('Payment created:', newOrderId);
                        // Lưu thông tin đơn hàng vào localStorage để tạo sau khi thanh toán thành công
                        localStorage.setItem('pendingOrder', JSON.stringify({
                            ...orderData,
                            orderId: newOrderId
                        }));
                    }
                } catch (err) {
                    console.error('Create payment error:', err);
                }

                setOrderData({
                    orderId: newOrderId,
                    amount: tongtien + shippingFee
                });
                setShowQRPopup(true);
            } else {
                // COD - Lưu đơn hàng ngay
                const result = await createOrder(token, orderData);
                
                if (result.success) {
                    alert('\u0110ặt hàng thành công! Mã đơn hàng: ' + result.data.orderId);
                    window.location.href = '/order';
                } else {
                    alert(result.message || '\u0110ặt hàng thất bại');
                }
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert(error.message || 'Có lỗi xảy ra khi đặt hàng');
        }
    };

    return (
        <section className={styles.cart}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <div className={styles.icon_cart}><FaOpencart /></div>
                    <span>GIỎ HÀNG CỦA BẠN</span>
                </div>

                {/* Thông báo lỗi */}
                {errorMessage && (
                    <div style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        padding: '15px 20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        zIndex: 9999,
                        maxWidth: '400px',
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }}>
                        ⚠️ {errorMessage}
                    </div>
                )}

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
                                                    <button 
                                                        onClick={() => handleQuantityChange(phone.id_product, phone.quantity - 1)}
                                                        disabled={phone.quantity <= 1}
                                                        style={{
                                                            padding: '5px 12px',
                                                            fontSize: '16px',
                                                            cursor: phone.quantity <= 1 ? 'not-allowed' : 'pointer',
                                                            border: '1px solid #ddd',
                                                            background: phone.quantity <= 1 ? '#f0f0f0' : '#fff',
                                                            borderRadius: '4px 0 0 4px'
                                                        }}
                                                    >
                                                        -
                                                    </button>
                                                    <input 
                                                        type="number" 
                                                        value={phone.quantity}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            if (!isNaN(val) && val > 0) {
                                                                handleQuantityChange(phone.id_product, val);
                                                            }
                                                        }}
                                                        style={{
                                                            width: '60px',
                                                            textAlign: 'center',
                                                            border: '1px solid #ddd',
                                                            borderLeft: 'none',
                                                            borderRight: 'none',
                                                            padding: '5px',
                                                            fontSize: '14px'
                                                        }}
                                                    />
                                                    <button 
                                                        onClick={() => handleQuantityChange(phone.id_product, phone.quantity + 1)}
                                                        style={{
                                                            padding: '5px 12px',
                                                            fontSize: '16px',
                                                            cursor: 'pointer',
                                                            border: '1px solid #ddd',
                                                            background: '#fff',
                                                            borderRadius: '0 4px 4px 0'
                                                        }}
                                                    >
                                                        +
                                                    </button>
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

                        {/* Thông tin người nhận */}
                        <div className={styles.thongtindiachi}>
                            <div className={styles.title_location}>
                                <MdEventNote style={{color:'green', fontWeight: 'bold'}}/>
                                <span>Thông tin người nhận</span>
                            </div>
                            
                            <div style={{padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                <div>
                                    <label style={{fontSize: '12pt', color: 'rgb(94, 94, 94)', display: 'block', marginBottom: '5px'}}>
                                        Họ và tên người nhận *
                                    </label>
                                    <input 
                                        type="text"
                                        value={receiverName}
                                        onChange={(e) => setReceiverName(e.target.value)}
                                        placeholder="Nhập họ và tên người nhận..."
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            fontSize: '14px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                                
                                <div>
                                    <label style={{fontSize: '12pt', color: 'rgb(94, 94, 94)', display: 'block', marginBottom: '5px'}}>
                                        Số điện thoại *
                                    </label>
                                    <input 
                                        type="tel"
                                        value={receiverPhone}
                                        onChange={(e) => setReceiverPhone(e.target.value)}
                                        placeholder="Nhập số điện thoại..."
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            fontSize: '14px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/*Thông tin địa chỉ */}
                        <div className={styles.thongtindiachi}>

                            <div className={styles.title_location}><IoLocation style={{color:'red', fontWeight: 'bold'}}/><span>Địa chỉ giao hàng</span></div>
                            <div className={styles.diachigiaohang}> {/*Địa chỉ giao hàng */}
                                <div>
                                    <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>Tỉnh/Thành phố *</span>
                                    <div className={styles.tinh}>
                                        <select 
                                            value={selectedProvince}
                                            onChange={(e) => setSelectedProvince(e.target.value)}
                                            style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}}
                                        >
                                            <option value="">Chọn tỉnh/thành</option>
                                            {provinces.map((province) => (
                                                <option key={province.ProvinceID} value={province.ProvinceID}>
                                                    {province.ProvinceName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>Quận/Huyện *</span>
                                    <div className={styles.quan}>
                                        <select 
                                            value={selectedDistrict}
                                            onChange={(e) => setSelectedDistrict(e.target.value)}
                                            disabled={!selectedProvince}
                                            style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}}
                                        >
                                            <option value="">Chọn quận/huyện</option>
                                            {districts.map((district) => (
                                                <option key={district.DistrictID} value={district.DistrictID}>
                                                    {district.DistrictName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>Phường/Xã *</span>
                                    <div className={styles.phuong}>
                                        <select 
                                            value={selectedWard}
                                            onChange={(e) => setSelectedWard(e.target.value)}
                                            disabled={!selectedDistrict}
                                            style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}}
                                        >
                                            <option value="">Chọn phường/xã</option>
                                            {wards.map((ward) => (
                                                <option key={ward.WardCode} value={ward.WardCode}>
                                                    {ward.WardName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>Địa chỉ cụ thể</span>
                            <input 
                                className={styles.diachicuthe} 
                                placeholder='Nhập địa chỉ cụ thể (số nhà, tên đường)...' 
                                type='text'
                                value={detailedAddress}
                                onChange={(e) => setDetailedAddress(e.target.value)}
                            />
                        
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

                            <div className={styles.giasp}>
                                <span style={{ color: 'rgb(94, 94, 94)' }}>Phí vận chuyển</span>
                                <span>
                                    {isCalculatingShipping ? (
                                        <span style={{fontSize: '12px'}}>Tính toán...</span>
                                    ) : shippingFee > 0 ? (
                                        <span>{shippingFee.toLocaleString("vi-VN")}đ</span>
                                    ) : (
                                        <span style={{fontSize: '12px', color: '#999'}}>Chọn địa chỉ</span>
                                    )}
                                </span>
                            </div>

                            <hr />

                            <div className={styles.tong_gia}>
                                <span>Tổng cộng</span>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                                    <span style={{ fontSize: '22pt', color: '#A70000' }}>{(tongtien + shippingFee).toLocaleString("vi-VN")}đ</span>
                                    <span style={{ fontSize: '12pt', color: 'rgb(94, 94, 94)' }}>(đã bao gồm VAT)</span>
                                </div>
                            </div>

                            <button disabled={tongtien === 0}
                                 onClick={(e) => {
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
