"use client"

import styles from "./cart.module.scss";

import { FaOpencart } from "react-icons/fa6";
export default function Cart () {
 
    return(
        <section className={styles.cart}> {/*Đây là section cart */}

            <div className={styles.container}> {/*Đây là phần container */}
                <div className={styles.title}> {/*Đây là phần title */}
                   <FaOpencart/> TRANG GIỎ HÀNG
                </div>

                <div className={styles.gridContainer}> {/*Đây là phần content {grid} */}

                    <div className={styles.item}>
                        <h1>item1</h1>
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