"use client"

import styles from "./cart.module.scss";

import { FaOpencart } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus  } from "react-icons/ci";

import Image  from "next/image";
import phone from './media/OPPO Find X9 12GB 256GB.png';

export default function Cart () {
 
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

                                        <span>OPPO Find X9 12GB 256GB</span>
                                        <span>256GB - Titan Tự Nhiên</span>
                                        <span>29.990.000đ</span>
                                        <span>34.990.000đ</span>
                                        <div> {/*Điều chỉnh số lượng */}
                                            <div><CiSquarePlus/></div>
                                            <span>0</span>
                                            <div><CiSquareMinus/></div>
                                        </div>
                                    </div>
                                </div>
                                <div>

                                </div>

                            </div>

                        </div>
                    </div>
                    <div className={styles.item}>
                        <h1>item2</h1>
                    </div>
                    <div className={styles.item}>

                    </div>

                </div>

            </div>

        </section>
    )
}