"use client"

import styles from "./cart.module.scss";

import { FaOpencart } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus  } from "react-icons/ci";

import { addToCart } from '../home/detail_product/[id]/api/addToCart.js';

import Link from "next/link";

import Image  from "next/image";
import phoneimg from './media/OPPO Find X9 12GB 256GB.png';

import { useState, useEffect } from "react";

import { getProduct } from './api/getProductInCart';
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


export default function Cart () {
    
    // const handle_addToCart = async () =>{
    //     try{
    //         const token = localStorage.getItem('token');
    //         const result = await addToCart(token, )
    //     }
    //     catch(err){
    //         console.error(err);
    //     }
    // }

    const [phones, setPhones] = useState<Phone[]>([]);

    useEffect(() => {
        const fetchProductInCart = async () => {
            console.log('Fetching data from api...');
            try{
                const token = localStorage.getItem('token');
                if(!token){
                    console.error('No token found. Please login first');
                    return;
                }

                const result = await getProduct(token);
                if(!result){
                    throw new Error(`HTTP error!`);
                }

                const data = result;

                console.log('Data from api: ', data);

                //Chuẩn hóa dữ liệu từ API
                const normalized: Phone[] = data.data.map((p: any) => ({
                    id_cart: Number(p.id_cart),
                    id_product:Number(p.id_product),
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
            catch(err){
                console.error('Error while fetching data: ', err);
            }
        }
        fetchProductInCart();
    }, []);

    return(
        <section className={styles.cart}> {/*Đây là section cart */}

            <div className={styles.container}> {/*Đây là phần container */}
                <div className={styles.title}> {/*Đây là phần title */}
                   <div className={styles.icon_cart}>
                       <FaOpencart />
                   </div>  
                   <span>GIỎ HÀNG CỦA BẠN</span>
                </div>

                <div className={styles.gridContainer}> {/*Đây là phần content {grid} */}

                    <div className={styles.item}>
                        <div className={styles.selection_toolbar}>
                            <div className={styles.select_all}>
                                <input type="checkbox"/><span>Chọn tất cả</span>
                            </div>

                            <div className={styles.delete_all}>
                                <FaRegTrashAlt/><span>Xóa tất cả</span>
                            </div>
                        </div>

                        <div className={styles.container_product}> {/*Chứa card */}

                            {phones.map((phone) => {
                                const discountedPrice =
                                    phone.percent > 0
                                    ? Math.round(phone.price * (1 - phone.percent / 100))
                                    : phone.price;
                                const thanhtien = discountedPrice * phone.quantity
                                return (

                            <div key={phone.id_product} className={styles.product}> {/*Card */}

                                <div className={styles.left}>
                                    <input type="checkbox"/>

                                    <Image src={phone.img} width={170} height={170} alt="ảnh sản phẩm"/>

                                    <div className={styles.inf}> {/*thông tin */}

                                        <span style={{fontSize: '13pt'}}>{phone.name_product}</span>
                                        <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>{phone.rom} - {phone.color}</span>
                                        <span style={{color: '#A70000'}}>{discountedPrice.toLocaleString("vi-VN")}đ</span>
                                        <span style={{color: 'rgb(94, 94, 94)', fontSize: '12pt', textDecoration: 'line-through'}}>{phone.price.toLocaleString("vi-VN")}đ</span>
                                        <div className={styles.quantity}> {/*Điều chỉnh số lượng */}
                                            <div className={styles.icon_quantity}><CiSquarePlus /></div>
                                            <span style={{fontSize: '15pt'}}>{phone.quantity}</span>
                                            <div className={styles.icon_quantity}><CiSquareMinus /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.icon_trash}><FaRegTrashAlt/></div>
                                    <div className={styles.price}>
                                        <span style={{fontSize: '10pt', color: 'rgb(94, 94, 94)'}}>Thành tiền</span>
                                        <span style={{color: '#A70000'}}>{thanhtien.toLocaleString("vn-VN")}đ</span>
                                    </div>
                                </div>

                            </div>

                               );
                                })}

                            



                            

                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.tongcong}>
                            <h4>Tổng đơn hàng</h4>

                            <div className={styles.giasp}>
                                <span style={{color: 'rgb(94, 94, 94)'}}>Tạm tính (1 sản phẩm)</span>
                                <span>31.990.000đ</span>
                            </div>
                            
                            <div className={styles.giavanchuyen}>
                                <span style={{color: 'rgb(94, 94, 94)'}}>Phí vận chuyển</span>
                                <span style={{color: 'green'}}>Miễn phí</span>
                            </div>
                            <hr/>


                            <div className={styles.tong_gia}>
                                <span>Tổng cộng</span>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                                    <span style={{fontSize: '22pt', color: '#A70000'}}>31.990.000đ</span>
                                    <span style={{fontSize: '12pt',color: 'rgb(94, 94, 94)'}}>(đã bao gồm VAT)</span>
                                </div>

                            </div>
                            
                                <Link href='/order' style={{textDecoration: 'none', color: '#fff'}}>
                                    <button>Tiến hành đặt hàng</button>
                                </Link> 
                                
                            <hr/>

                            <ul>
                                <li><span>Bảo hành chính hãng 12 tháng</span></li>
                                <li><span>Đổi trả trong 7 ngày</span></li>
                                <li><span>Thanh toán an toàn & bảo mật</span></li>
                            </ul>

                        </div>
                    </div>
                    <div className={styles.item}>

                    </div>

                </div>

            </div>

        </section>
    )
}