"use client"

import styles from "./cart.module.scss";

export default function Cart () {

    return(
        <section className={styles.cart}> {/*Đây là section cart */}

            <div className={styles.container}> {/*Đây là phần container */}
                <div className={styles.title}> {/*Đây là phần title */}
                    <h1>TRANG GIỎ HÀNG</h1>
                </div>

                <div className={styles.gridContainer}> {/*Đây là phần content {grid} */}

                    <div className={styles.item}>

                    </div>
                    <div className={styles.item}>

                    </div>
                    <div className={styles.item}>

                    </div>

                </div>

            </div>

        </section>
    )
}