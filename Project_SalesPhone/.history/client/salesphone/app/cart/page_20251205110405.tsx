"use client"

import styles from "./cart.module.scss";
import { FaOpencart, FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { getProduct } from './api/getProductInCart';
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

    useEffect(() => {
        const fetchProductInCart = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const result = await getProduct(token);
                if (!result) throw new Error("HTTP error!");

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
    const handleCheckout = () => {
        if (paymentMethod === 'bank_transfer') {
            // Tạo mã đơn hàng
            const newOrderId = 'DH' + Date.now();
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

                            <Link href='/order' style={{ textDecoration: 'none', color: '#fff' }}>
                                <button>Tiến hành đặt hàng</button>
                            </Link>

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
        </section>
    );
}
