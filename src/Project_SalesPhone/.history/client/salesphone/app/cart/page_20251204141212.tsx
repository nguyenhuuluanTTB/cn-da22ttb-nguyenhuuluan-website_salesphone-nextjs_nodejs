"use client"

import styles from "./cart.module.scss";

import { FaOpencart } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus  } from "react-icons/ci";

import { addToCart } from './api/addToCart.js';

import Link from "next/link";

import Image  from "next/image";
import phone from './media/OPPO Find X9 12GB 256GB.png';

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

                            <div className={styles.product}> {/*Card */}

                                <div className={styles.left}>
                                    <input type="checkbox"/>

                                    <Image src={phone} alt="ảnh sản phẩm"/>

                                    <div className={styles.inf}> {/*thông tin */}

                                        <span style={{fontSize: '13pt'}}>OPPO Find X9 12GB 256GB</span>
                                        <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>256GB - Titan Tự Nhiên</span>
                                        <span style={{color: '#A70000'}}>29.990.000đ</span>
                                        <span style={{color: 'rgb(94, 94, 94)', fontSize: '12pt', textDecoration: 'line-through'}}>34.990.000đ</span>
                                        <div className={styles.quantity}> {/*Điều chỉnh số lượng */}
                                            <div className={styles.icon_quantity}><CiSquarePlus /></div>
                                            <span style={{fontSize: '20pt'}}>0</span>
                                            <div className={styles.icon_quantity}><CiSquareMinus /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.icon_trash}><FaRegTrashAlt/></div>
                                    <div className={styles.price}>
                                        <span style={{fontSize: '10pt', color: 'rgb(94, 94, 94)'}}>Thành tiền</span>
                                        <span style={{color: '#A70000'}}>29.990.000đ</span>
                                    </div>
                                </div>

                            </div>



                            <div className={styles.product}> {/*Card */}

                                <div className={styles.left}>
                                    <input type="checkbox"/>

                                    <Image src={phone} alt="ảnh sản phẩm"/>

                                    <div className={styles.inf}> {/*thông tin */}

                                        <span style={{fontSize: '13pt'}}>OPPO Find X9 12GB 256GB</span>
                                        <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>256GB - Titan Tự Nhiên</span>
                                        <span style={{color: '#A70000'}}>29.990.000đ</span>
                                        <span style={{color: 'rgb(94, 94, 94)', fontSize: '12pt', textDecoration: 'line-through'}}>34.990.000đ</span>
                                        <div className={styles.quantity}> {/*Điều chỉnh số lượng */}
                                            <div className={styles.icon_quantity}><CiSquarePlus /></div>
                                            <span style={{fontSize: '20pt'}}>0</span>
                                            <div className={styles.icon_quantity}><CiSquareMinus /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.icon_trash}><FaRegTrashAlt/></div>
                                    <div className={styles.price}>
                                        <span style={{fontSize: '10pt', color: 'rgb(94, 94, 94)'}}>Thành tiền</span>
                                        <span style={{color: '#A70000'}}>29.990.000đ</span>
                                    </div>
                                </div>

                            </div>



                            <div className={styles.product}> {/*Card */}

                                <div className={styles.left}>
                                    <input type="checkbox"/>

                                    <Image src={phone} alt="ảnh sản phẩm"/>

                                    <div className={styles.inf}> {/*thông tin */}

                                        <span style={{fontSize: '13pt'}}>OPPO Find X9 12GB 256GB</span>
                                        <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>256GB - Titan Tự Nhiên</span>
                                        <span style={{color: '#A70000'}}>29.990.000đ</span>
                                        <span style={{color: 'rgb(94, 94, 94)', fontSize: '12pt', textDecoration: 'line-through'}}>34.990.000đ</span>
                                        <div className={styles.quantity}> {/*Điều chỉnh số lượng */}
                                            <div className={styles.icon_quantity}><CiSquarePlus /></div>
                                            <span style={{fontSize: '20pt'}}>0</span>
                                            <div className={styles.icon_quantity}><CiSquareMinus /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.icon_trash}><FaRegTrashAlt/></div>
                                    <div className={styles.price}>
                                        <span style={{fontSize: '10pt', color: 'rgb(94, 94, 94)'}}>Thành tiền</span>
                                        <span style={{color: '#A70000'}}>29.990.000đ</span>
                                    </div>
                                </div>

                            </div>

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