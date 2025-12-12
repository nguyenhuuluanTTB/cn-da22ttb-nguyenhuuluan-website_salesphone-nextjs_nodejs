"use client"

import styles from "./cart.module.scss";

import { FaOpencart } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

import Image  from "next/image";
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

                                <div>
                                    <input type="checkbox"/>
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